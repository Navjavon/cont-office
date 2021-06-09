import {Component, Vue, Watch} from 'vue-property-decorator';
import ComplaintService from '@/services/complaint.service';

import ComplaintTable from '@/components/complaint-table/ComplaintTable.vue';
import ComplaintFilter from '@/components/complaint-filter/ComplaintFilter.vue';
import ComplaintPreview from '@/components/complaint-preview/ComplaintPreview.vue';
import ComplaintPrint from '@/components/complaint-print/ComplaintPrint.vue';
import ComplaintDelete from '@/components/complaint-delete/ComplaintDelete.vue';
import Paginator from '@/components/paginator/Paginator.vue';
import NewComplaint from '@/views/NewComplaint/NewComplaint.vue';

import {printHtmlElementById} from '@/utils/printer';
import {EComplaint} from '@/store/e-complaint';
import bus from '@/services/event-bus';

@Component({
    name: 'complaints',
    components: {
        ComplaintTable,
        ComplaintFilter,
        ComplaintPreview,
        ComplaintPrint,
        ComplaintDelete,
        Paginator,
        NewComplaint
    }
})
export default class ComplaintsView extends Vue {
    pages: number = 0;
    deleteDialog: boolean = false;
    previewDialog: boolean = false;
    editDialog: boolean = false;
    printId: string = 'complaintPrint';

    complaints: IComplaint[] = [];
    complaintId: number = 0;
    selectedComplaint: IComplaint = EComplaint;
    copiedFilter = null;

    filter: IFilter = {};
    status: string = '';

    @Watch('$route.params.status')
    async changeStatus(newStatus: string) {
        this.status = newStatus;
        await this.getComplaint();
    }

    beforeMount() {
        this.status = this.$route.params.status;
    }

    async mounted() {
        this.copiedFilter = {...this.filter};
        await this.getComplaint();

        bus.$on('reset', async () => {
            this.filter = this.copiedFilter;
            await this.getComplaint();
        });

        bus.$on('complaintUpdated', (updatedComplaint) => {
            const complaints = this.complaints.slice();
            let componentId = complaints.findIndex(({id}) => id === updatedComplaint.id);
            if (componentId !== -1) {
                complaints[componentId] = updatedComplaint;
                this.complaints = complaints;
            }
            this.editDialog = false;
        });
    }

    async onPageChange(page: number) {
        this.filter.page = page;
        await this.getComplaints();
    }

    async onSearch(search: string) {
        this.filter.text = search;
        this.filter.page = 1;
        await this.getComplaints();
    }

    async onSearchButtonClick(newFilter: IFilter = null) {
        if (newFilter) {
            this.filter = {
                ...this.filter,
                ...newFilter
            };
        }

        this.filter.page = 1;
        await this.getComplaints();
    }

    async getComplaints() {
        const {
            complaints,
            pages
        } = await ComplaintService.getComplaintsByFilter(this.filter);

        this.complaints = complaints;
        this.pages = pages;
    }

    onDeleteClick(id: number) {
        this.complaintId = id;
        this.deleteDialog = true;
    }

    onEditClick(complaint: IComplaint) {
        this.selectedComplaint = JSON.parse(JSON.stringify(complaint));
        this.editDialog = true;
    }

    onPreviewClick(complaint: IComplaint) {
        this.selectedComplaint = complaint;
        this.previewDialog = true;
    }

    onPrintClick(complaint: IComplaint) {
        this.selectedComplaint = complaint;
        setTimeout(() => printHtmlElementById(this.printId), 0);
    }

    onDeleteDialogHide(dialog: boolean) {
        this.deleteDialog = dialog;
    }

    onPreviewDialogHide(dialog: boolean) {
        this.previewDialog = dialog;
    }

    onComplaintDelete(result: boolean) {
        this.deleteDialog = false;
        if (result) {
            return;
        }

        let {
            complaints,
            complaintId
        } = this;

        const index = complaints.findIndex(({id}) => id === complaintId);
        if (index !== -1) {
            this.complaints.splice(index, 1);
            bus.$emit('complaintEdited');
        }
    }

    private async getComplaint() {
        const {status, filter} = this;
        if (status && status === 'active') {
            // TODO get active id from statusService
            filter.statusId = 1;
        } else if (filter.statusId) {
            delete filter.statusId;
        }

        const {
            complaints,
            pages
        } = await ComplaintService.getComplaintsByFilter(filter);

        this.complaints = complaints;
        this.pages = pages;
    }
}
