import {Component, Vue} from 'vue-property-decorator';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';
import AddEditModal from '@/components/add-edit/AddEditModal.vue';
import {IAddEditModalType} from '@/components/add-edit/AddEditModal.types';
import {IConfirmModalType} from '@/components/confirm-modal/ConfirmModal.types';
import DepartmentService from '@/services/department.service';

@Component({
  components: {
    ConfirmModal,
    AddEditModal
  }
})
export default class DepartmentComponent extends Vue {
  addEditData: IAddEditModalType = {} as any;
  confirmData: IConfirmModalType = {} as any;
  filteredDepartment: IDepartment[] = [];
  showAddEdit = false;
  searchValue = '';
  private departments: IDepartment[] = [];
  private idx = -1;

  get search(): string {
    return this.searchValue;
  }

  set search(value: string) {
    this.searchValue = value;
    this.findItems(value);
  }

  async mounted() {
    await this.getGroups();
  }

  addDepartment() {
    this.addEditData = {
      addNew: true,
      show: true,
      type: 'department',
      data: null
    };
    this.showAddEdit = true;
  }

  editDepartment(idx: number) {
    this.idx = idx;
    this.addEditData = {
      addNew: false,
      show: true,
      type: 'department',
      data: this.departments[idx]
    };
    this.showAddEdit = true;
  }

  deleteDepartment(idx: number) {
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
        this.filteredDepartment.splice(this.idx, 1, data.data);
      }
    }
  }

  async onCloseConfirm(value: any) {
    const {result} = value;
    if (result) {
      const id = this.departments[this.idx].id;
      const err = await DepartmentService.deleteDepartment(id);

      if (!err) {
        this.filteredDepartment.splice(this.idx, 1);
        this.filteredDepartment = this.departments;
      }
    }
  }
  private findItems(value: string) {
    if (!value) {
      this.filteredDepartment = this.departments;
      return;
    }

    value = value.toLowerCase();
    this.filteredDepartment = this.departments.filter(({name}) => (
      name.toLowerCase().includes(value)
    ));
  }
  private async getGroups() {
    this.departments = this.filteredDepartment = await DepartmentService.items(true);
  }
}
