import {Component, Vue} from 'vue-property-decorator';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';
import AddEditModal from '@/components/add-edit/AddEditModal.vue';
import {IAddEditModalType} from '@/components/add-edit/AddEditModal.types';
import {IConfirmModalType} from '@/components/confirm-modal/ConfirmModal.types';
import StatusService from '@/services/status.service';

@Component({
  components: {
    ConfirmModal,
    AddEditModal
  }
})

export default class ComplaintsStatusComponent extends Vue {
  addEditData: IAddEditModalType = {} as any;
  confirmData: IConfirmModalType = {} as any;
  filteredStatus: IStatus[] = [];
  showAddEdit = false;
  private status: IStatus[] = [];
  private idx = -1;

  async mounted() {
    await this.getStatus();
  }

  addStatus() {
    this.addEditData = {
      addNew: true,
      show: true,
      type: 'status',
      data: null
    };
    this.showAddEdit = true;
  }

  editStatus(idx: number) {
    this.idx = idx;
    this.addEditData = {
      addNew: false,
      show: true,
      type: 'status',
      data: {...this.status[idx]}
    };
    this.showAddEdit = true;
  }

  deleteStatus(idx: number) {
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
        await this.getStatus();
      } else {
        this.filteredStatus.splice(this.idx, 1, data.data);
      }
    }
  }

  async onCloseConfirm(value: any) {
    const {result} = value;
    if (result) {
      const id = this.status[this.idx].id;
      const err = await StatusService.deleteStatus(id);

      if (!err) {
        this.filteredStatus.splice(this.idx, 1);
        this.filteredStatus = this.status;
      }
    }
  }

  private async getStatus() {
    this.status = this.filteredStatus = await StatusService.items(true);
  }
}
