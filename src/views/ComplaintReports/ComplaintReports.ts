import {Component, Vue} from 'vue-property-decorator';
import StatusService from '@/services/status.service';
import GroupService  from '@/services/group.service';
import ComplaintService from '@/services/complaint.service';
import ReportFilter     from '@/components/report-filter/ReportFilter.vue';
import ReportComplaintTable from '@/components/report-complaint-table/ReportComplaintTable.vue';

@Component({
  name: 'report-complaints',
  components: {
    ReportFilter,
    ReportComplaintTable
  }
})
export default class ComplaintReports extends Vue {
  statuses: IStatus[] = [];
  selectedGroup: number = 0;

  groups: IGroup[] = [];
  filteredGroups: IGroup[] = [];

  filter: IFilter = {};
  reportComplaints: IComplaintFullReport[] = [];
  filteredReportComplaints: IComplaintFullReport[] = [];

  async beforeMount() {
    this.statuses = await StatusService.items();
    this.groups = await GroupService.complaints();
    await this.getReportComplaints();
  }

  onGroupChange(id: number) {
    this.selectedGroup = id;
    this.filterByGroup();
  }

  filterByGroup() {
    const {selectedGroup, reportComplaints, groups} = this;
    this.filteredReportComplaints = selectedGroup ?
        reportComplaints.filter(({groupId}) =>
            groupId === selectedGroup
        ) :
        reportComplaints;

    this.filteredGroups = selectedGroup ?
        groups.filter(({id}) =>
          id === selectedGroup
        ) :
        groups;
  }

  async onSearchButtonClick(newFilter: IFilter) {
    this.filter = {
      ...this.filter,
      ...newFilter
    };

    await this.getReportComplaints();
  }

  async getReportComplaints() {
    this.reportComplaints = await ComplaintService.getFullReport(this.filter);
    this.filterByGroup();
  }
}
