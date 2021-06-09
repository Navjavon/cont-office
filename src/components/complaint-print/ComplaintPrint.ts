import {Component, Vue, Prop} from 'vue-property-decorator';
import moment from 'moment';
import {CompanyService} from '@/services/company.service';
import {EComplaintDeleted} from '@/store/e-complaint';
import {printHtmlElementById} from '@/utils/printer';

@Component({
    name: 'complaint-print'
})
export default class ComplaintPrint extends Vue {
    @Prop({default: true})
    show: boolean;

    @Prop({default: EComplaintDeleted})
    complaint: IComplaint | IComplaintDeleted;

    @Prop({default: false})
    isDeleteComplaint: boolean;

    @Prop({default: 'print'})
    id: string;

    companyName: string = '';

    async beforeMount() {
        this.companyName = await CompanyService.getCompanyName();
    }

    onPrintClick() {
        setTimeout(() => printHtmlElementById('print'), 0);
    }

    getExecutionDiff() {
        const {creationDate, execution: {date}} = this.complaint;
        const a = moment(creationDate);
        const b = moment(date);
        return b.diff(a, 'days');
    }
}
