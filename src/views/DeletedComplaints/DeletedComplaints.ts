import {Component, Vue} from 'vue-property-decorator';
import ComplaintPreview from '@/components/complaint-preview/ComplaintPreview.vue';
import ComplaintService from '@/services/complaint.service';
import {EComplaintDeleted} from '@/store/e-complaint';
import Paginator from '@/components/paginator/Paginator.vue';

@Component({
  name: 'complaints-deleted',
  components: {
    ComplaintPreview,
    Paginator
  }
})
export default class DeletedComplaints extends Vue {
  pages: number = 0;
  page: number = 1;
  deletedComplaints: IComplaintDeleted[] = [];
  selectedComplaint: IComplaintDeleted = EComplaintDeleted;
  previewDialog: boolean = false;

  async beforeMount() {
    await this.getComplaints();
  }

  async onPageChange(page: number) {
    this.page = page;
    await this.getComplaints();
  }

  async getComplaints() {
    const {
      complaints,
      pages
    } = await ComplaintService.getAllDeleted(this.page);

    this.deletedComplaints = complaints;
    this.pages = pages;
  }

  onPreviewDialogHide(dialog: boolean) {
    this.previewDialog = dialog;
  }

  onPreviewClick(complaint: IComplaintDeleted) {
    this.selectedComplaint = complaint;
    this.previewDialog = true;
  }
}
