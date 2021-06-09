import {Component, Vue} from 'vue-property-decorator';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';
import AddEditModal from '@/components/add-edit/AddEditModal.vue';
import {IAddEditModalType} from '@/components/add-edit/AddEditModal.types';
import {IConfirmModalType} from '@/components/confirm-modal/ConfirmModal.types';
import GroupService from '@/services/group.service';

@Component({
  components: {
    ConfirmModal,
    AddEditModal
  }
})
export default class DeleteReasonsComponent extends Vue {
  addEditData: IAddEditModalType = {} as any;
  confirmData: IConfirmModalType = {} as any;
  filteredGroup: IRegion[] = [];
  showAddEdit = false;
  private removedGroup: IRegion[] = [];
  private idx = -1;

  async mounted() {
    await this.getGroups();
  }

  addReason() {
    this.addEditData = {
      addNew: true,
      show: true,
      type: 'reason',
      data: null
    };
    this.showAddEdit = true;
  }

  editReason(idx: number) {
    this.idx = idx;
    this.addEditData = {
      addNew: false,
      show: true,
      type: 'reason',
      data: this.removedGroup[idx]
    };
    this.showAddEdit = true;
  }

  deleteReason(idx: number) {
    this.idx = idx;
    this.confirmData = {
      show: true,
      message: 'Дар хакикат Шумо сабтро тоза кардан мехохед?'
    };
  }

  async onCloseAddModal(data: any) {
    if (data) {
      this.showAddEdit = data.show;
      if (!data.data) {
        return;
      }

      if (this.addEditData.addNew) {
        await this.getGroups();
      } else {
        this.filteredGroup.splice(this.idx, 1, data.data);
      }
    }
  }

  async onCloseConfirm(value: any) {
    const {result} = value;
    if (result) {
      const id = this.removedGroup[this.idx].id;
      const err = await GroupService.deleteRemoveReason(id);

      if (!err) {
        this.filteredGroup.splice(this.idx, 1);
        this.filteredGroup = this.removedGroup;
      }
    }
  }

  private async getGroups() {
    this.removedGroup = this.filteredGroup = await GroupService.complaintRemoveReasons(true);
  }
}
