import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

import StatusService from '@/services/status.service';
import GroupService from '@/services/group.service';
import RegionService from '@/services/region.service';
import DepartmentService from '@/services/department.service';
import ComplaintService from '@/services/complaint.service';

import {EComplaint} from '@/store/e-complaint';
import {getTimeStamp} from '@/utils/getTimeStamp';
import dateToISOString, {formattedDate} from '@/utils/date';
import complaintNumber from '@/filters/complaintNumber';
import bus from '@/services/event-bus';
import {Routes} from '@/store/routes';
import AccountService from '@/services/account.service';
import ComplaintPreview from '@/components/complaint-preview/ComplaintPreview.vue';

@Component({
    name: 'new-complaint',
    components: {
        ComplaintPreview
    }
})
export default class NewComplaint extends Vue {
    panel: number[] = [0, 1, 2, 3];
    menu = false;
    performanceMenu = false;

    initialStatus: number = 0;

    creationDate: string = '';
    executionDate: string = '';
    complaintNumber: string = '';

    previewDialog: boolean = false;

    @Prop({default: () => JSON.parse(JSON.stringify(EComplaint))})
    complaint: IComplaint;

    @Prop({default: true})
    isNewComplaint: boolean;

    regions: IRegion[] = [];
    statuses: IStatus[] = [];
    complaintGroups: IGroup[] = [];
    departments: IDepartment[] = [];

    rule = {
        required: (value: any) => !!value || 'Ҳатмист.'
    };

    @Watch('complaint')
    onNewComplaint(newComplaint: IComplaint) {
        this.initialStatus = newComplaint.status.id;
    }

    async beforeMount() {
        const user = AccountService.user;
        const {complaint} = this;

        this.statuses = await StatusService.getActiveItems();
        this.initialStatus = complaint.status.id;

        this.complaintGroups = await GroupService.getActiveComplaints();
        this.departments = await DepartmentService.getActiveItems();

        this.regions = await RegionService.getActiveItems();
        complaint.region.id = this.regions[0]?.id || 0;

        let {
            number: newNumber,
            creationDate,
            execution: {
                date
            }
        } = complaint;

        if (!this.isNewComplaint) {
            this.executionDate = dateToISOString(date);
        } else {
            ({newNumber} = await ComplaintService.getNewNumber());
            complaint.number = newNumber;
            complaint.creator = {
                id: user.id,
                name: user.firstName,
                surname: user.lastName
            };
        }

        this.creationDate = dateToISOString(creationDate);
        this.complaintNumber = complaintNumber(newNumber);
    }

    formattedDate(date: string) {
        return formattedDate(date);
    }

    onPreviewDialogHide(dialog: boolean) {
        this.previewDialog = dialog;
        if (!dialog) {
            this.$router.push(Routes.Complaints);
        }
    }

    async onSubmit(_: Event) {
        const {complaint, isNewComplaint, initialStatus} = this;
        complaint.creationDate = getTimeStamp(this.creationDate);
        complaint.execution.date = getTimeStamp(this.executionDate);

        const error = isNewComplaint ?
            await ComplaintService.createComplaint(complaint) :
            await ComplaintService.updateComplaint(complaint);

        if (error) {
            Object.keys(error).forEach((field) => {
                // @ts-ignore
                this.$refs[field].validate(true);
            });

            return;
        }

        if (isNewComplaint) {
            this.previewDialog = true;
            const {
                execution: {
                    resDepartment
                },
                execution,
                group
            } = complaint;
            execution.resDepartment = this.departments.find(({id}) => id === resDepartment.id);
            complaint.group = this.complaintGroups.find(({id}) => id === group.id);

            bus.$emit('newComplaint');
            return;
        }

        const {status: {id: newStatus}} = complaint;
        if (initialStatus !== newStatus) {
            newStatus !== 1 ? bus.$emit('complaintEdited') : bus.$emit('newComplaint');
        }

        const status = this.statuses.find(({id}) => id === newStatus);
        complaint.status.name = status?.name;
        bus.$emit('complaintUpdated', complaint);
    }
}
