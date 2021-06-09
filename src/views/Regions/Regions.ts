import {Component, Vue} from 'vue-property-decorator';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';
import {IConfirmModalType} from '@/components/confirm-modal/ConfirmModal.types';
import RegionService from '@/services/region.service';
import {IAddEditModalType} from '@/components/add-edit/AddEditModal.types';
import AddEditModal from '@/components/add-edit/AddEditModal.vue';

@Component({
  components: {
    ConfirmModal,
    AddEditModal
  }
})
export default class RegionsComponent extends Vue {
  addEditData: IAddEditModalType = {} as any;
  confirmData: IConfirmModalType = {} as any;
  filteredRegions: IRegion[] = [];
  showAddEdit = false;
  private regions: IRegion[] = [];
  private searchValue = '';
  private idx = -1;

  get search(): string {
    return this.searchValue;
  }

  set search(value: string) {
    this.searchValue = value;
    this.findRegions(value);
  }

  async mounted() {
    await this.getRegions();
  }

  addNewRegion() {
    this.addEditData = {
      addNew: true,
      show: true,
      type: 'region',
      data: null
    };
    this.showAddEdit = true;
  }

  editRegion(idx: number) {
    this.idx = idx;
    this.addEditData = {
      addNew: false,
      show: true,
      type: 'region',
      data: this.regions[idx]
    };
    this.showAddEdit = true;
  }

  deleteRegion(idx: number) {
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
        await this.getRegions();
      } else {
        this.filteredRegions.splice(this.idx, 1, data.data);
      }
    }
  }

  async onCloseConfirm(value: any) {
    const {result} = value;
    if (result) {
      const id = this.regions[this.idx].id;
      const err = await RegionService.deleteRegion(id);

      if (!err) {
        this.filteredRegions.splice(this.idx, 1);
        this.filteredRegions = this.regions;
      }
    }
  }

  private findRegions(value: string) {
    if (!value) {
      this.filteredRegions = this.regions;
      return;
    }

    value = value.toLowerCase();
    this.filteredRegions = this.regions.filter(({name}) => (
      name.toLowerCase().includes(value)
    ));
  }

  private async getRegions() {
    this.regions = this.filteredRegions = await RegionService.items(true);
  }
}
