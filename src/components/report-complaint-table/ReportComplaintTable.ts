import {Component, Prop, Vue} from 'vue-property-decorator';
import getSum from '@/utils/getSum';

@Component({
  name: 'report-complaint-table'
})
export default class ReportComplaintTable extends Vue {
  @Prop({default: []})
  reportComplaints: IComplaintFullReport[];

  @Prop({default: []})
  statuses: IStatus[];

  @Prop({default: []})
  groups: IGroup[];

  getCountByStatusAndGroup(sId: number, gId: number) {
    const reportComplaint = this.reportComplaints.find(({groupId, statusId}) => (
        groupId === gId && statusId === sId
    ));
    return reportComplaint?.count || 0;
  }

  getSum(reportComplaints: IComplaintFullReport[]) {
    return getSum(reportComplaints);
  }

  getCountByGroup(id: number) {
    const filterReports = this.reportComplaints.filter(({groupId}) => groupId === id);
    return this.getSum(filterReports);
  }

  getCountByStatus(id: number) {
      const filterReports = this.reportComplaints.filter(({statusId}) => statusId === id);
      return this.getSum(filterReports);
  }
}
