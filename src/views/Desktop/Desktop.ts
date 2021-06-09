import {Component, Vue} from 'vue-property-decorator';
import ReportSuggestionTable from '@/components/report-suggestion-table/ReportSuggestionTable.vue';
import SuggestionService from '@/services/suggestion.service';
import ComplaintService  from '@/services/complaint.service';
import GroupService      from '@/services/group.service';
import getSum from '@/utils/getSum';

@Component({
  name: 'desktop',
  components: {
    ReportSuggestionTable,
  }
})
export default class DesktopView extends Vue {
  complaints: IComplaintShortReport[] = [];
  suggestions: ISuggestionReport[] = [];
  groups: IGroup[] = [];
  suggestionGroups: IGroup[] = [];

  async mounted() {
    this.suggestions = await SuggestionService.getFullReport();
    this.complaints = await ComplaintService.getShortReport();
    this.groups = await GroupService.complaints();
    this.suggestionGroups = await GroupService.getSuggestionGroups();
  }

  getSum(reportSuggestion: IComplaintShortReport[]) {
    return getSum(reportSuggestion);
  }

  getGroupName(groupId: number) {
    const group = this.groups.find((g) => g.id === groupId);
    return group?.name || '';
  }
}
