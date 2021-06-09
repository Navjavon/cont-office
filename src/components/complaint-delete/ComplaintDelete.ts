import {Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator';
import GroupService     from '@/services/group.service';
import ComplaintService from '@/services/complaint.service';

@Component({
    name: 'complaint-delete'
})
export default class ComplaintDelete extends Vue {
    @Prop({default: false})
    show: boolean;
    dialog: boolean = false;

    @Prop({default: 0})
    complaintId: number;

    selectedGroup: number = 0;
    removeReason: string = '';

    removeReasonGroups: IGroup[] = [];

    async beforeMount() {
        this.removeReasonGroups = await GroupService.getActiveRemoveReasons();
    }

    @Watch('show')
    onPropShowChange(newValue: boolean) {
        this.removeReason = '';
        this.selectedGroup = 0;
        this.dialog = newValue;
    }

    @Watch('dialog')
    @Emit()
    onDialogChange(newValue: boolean) {
        return newValue;
    }

    @Emit()
    async onDelete() {
        const complaint: IComplaintDelete = {
            id: this.complaintId,
            remReasonId: this.selectedGroup,
            remReasonDesc: this.removeReason
        };

        const error = await ComplaintService.deleteComplaint(complaint);
        return !!error;
    }
}
