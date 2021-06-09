import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
import {IAddEditModalType} from '@/components/add-edit/AddEditModal.types';
import RegionService from '@/services/region.service';
import GroupService from '@/services/group.service';
import StatusService from '@/services/status.service';
import DepartmentService from '@/services/department.service';
import {GROUP_TYPES} from '@/store/api-constants';

@Component({
  name: 'add-edit-modal'
})
export default class AddEditModal extends Vue {
  parentCategory: IGroup[] = [];
  selectedParent = null;
  newData = {} as any;
  oldData = {} as any;
  isSuggestionType = false;
  isGroupType = false;
  isRegType = false;
  isReasonType = false;
  isStatusType = false;
  isDepartment = false;
  regLabel = 'Номи ';
  valid = true;
  show = false;
  addNew = false;
  rules = {
    required: (value: string) => !!value || 'Хатмист.'
  };

  @Prop()
  addEditData: IAddEditModalType;

  private parentId = null;

  mounted() {
    this.show = this.addEditData.show;
    this.addNew = this.addEditData.addNew;
    switch (this.addEditData.type) {
      case 'region':
        this.regLabel += 'нохия:';
        this.isRegType = true;
        break;
      case 'reason':
        this.regLabel = 'Сабаби нест кардан:';
        this.isReasonType = true;
        break;
      case 'group':
        this.regLabel += 'шикоят:';
        this.isGroupType = true;
        this.parentCategory = this.addEditData.data.parents;
        break;
      case 'status':
        this.regLabel += 'холат:';
        this.isStatusType = true;
        break;
      case 'suggestion':
        this.regLabel += 'пешниход:';
        this.isSuggestionType = true;
        break;
      case 'department':
        this.regLabel += 'департамент:';
        this.isDepartment = true;
        if (this.addNew) {
          this.newData.chief = {
            name: '',
            lastName: ''
          }
        }
        break;
    }
    this.newData.isActive = true;

    if (!this.addNew) {
      this.newData = this.isGroupType ? {...this.addEditData.data.group} : {...this.addEditData.data};
      if (this.isGroupType) {
        this.selectedParent = this.parentCategory.find(({id}) => id === this.newData.parent);
        this.parentId = this.selectedParent ? this.selectedParent.id : -1;

        const name = this.newData.name.split('→');
        this.newData.name = name[1]?.trim() || name[0];
      }
      if (this.isDepartment) {
        const name = this.newData.chief?.split(' ') || ['', ''];
        this.newData.chief = {
          name: name[0],
          lastName: name[1]
        }
      }
      this.oldData = {...this.newData};
    }
  }

  @Emit()
  async onCloseAddModal(cancel = false) {

    if (cancel) {
      return this.onCancel();
    }

    let result = null;

    if (this.addNew) {
      result = await this.addNewData();
      if (result.err) {
        return this.onCancel();
      }
    } else if (this.dataHasChanged()) {
      result = await this.updateData();
      if (result) {
        return this.onCancel();
      }
    } else {
      return this.onCancel();
    }

    const data = this.addNew ? result.data : this.newData;

    if (data) {
      this.show = false;
      return {data, show: this.show};
    }
  }

  private async addNewData() {
    switch (true) {
      case this.isRegType:
        return await this.addNewRegion();
      case this.isStatusType:
        return await this.addNewStatus();
      case this.isReasonType:
      case this.isGroupType:
      case this.isSuggestionType:
        return await this.addNewGroup();
      case this.isDepartment:
        return await this.addNewDepartment();
    }
  }

  private async updateData() {
    const data = this.addEditData.data;
    const id = this.isGroupType ? data.group.id : data.id;

    switch (true) {
      case this.isRegType:
        return await RegionService.updateRegion(id, this.newData);
      case this.isStatusType:
        return await StatusService.updateStatus(id, this.newData);
      case this.isReasonType:
      case this.isGroupType:
        this.newData.parent = this.setParent();
        return await GroupService.updateRemoveReason(id, this.newData);
      case this.isSuggestionType:
        return await GroupService.updateRemoveReason(id, this.newData);
      case this.isDepartment:
        this.newData.chief = this.newData.chief.name + ' ' + this.newData.chief.lastName;
        return await DepartmentService.updateDepartment(id, this.newData);
    }

    return null;
  }

  private async addNewRegion(): Promise<{ err: boolean, data: IRegion }> {
    const regionData = {} as any;
    regionData.name = this.newData.name;
    regionData.isActive = this.newData.isActive;
    const err = await RegionService.addNewRegion(regionData);
    return {err, data: regionData};
  }

  private async addNewGroup(): Promise<{ err: boolean, data: IGroup }> {
    const groupData = {} as any;
    groupData.parent = this.setParent();
    groupData.name = this.newData.name;
    groupData.isActive = this.newData.isActive;
    groupData.type = this.isGroupType ? GROUP_TYPES.COMPLAINT :
      this.isSuggestionType ? GROUP_TYPES.SUGGESTION : GROUP_TYPES.REMOVE_REASON;
    const err = await GroupService.addNewRemoveReason(groupData);
    return {err, data: groupData};
  }

  private async addNewStatus(): Promise<{ err: boolean, data: IStatus }> {
    const statusData = {} as any;
    statusData.name = this.newData.name;
    statusData.isActive = this.newData.isActive;
    const err = await StatusService.addStatus(statusData);
    return {err, data: statusData};
  }

  private async addNewDepartment(): Promise<{ err: boolean, data: IDepartment }> {
    const data = {} as any;
    data.name = this.newData.name;
    data.isActive = this.newData.isActive;
    data.chief = this.newData.chief.name + ' ' + this.newData.chief.lastName;
    const err = await DepartmentService.addNewDepartment(data);
    return {err, data};
  }

  private dataHasChanged(): boolean {
    if (this.isDepartment) {
      const name = this.newData.chief.name + ' ' + this.newData.chief.lastName;
      return name !== this.oldData.chief || this.newData.name !== this.oldData.name;
    }
    let parentChanged = false;
    if (this.isGroupType && this.selectedParent) {
      parentChanged = this.parentId !== this.selectedParent.id
    }

    return this.newData.isActive !== this.oldData.isActive ||
      this.newData.name !== this.oldData.name ||
      parentChanged;
  }

  private setParent() {
    return this.selectedParent ? this.selectedParent.id : null;
  }

  private onCancel() {
    this.show = false;
    return {data: null, show: this.show};
  }
}
