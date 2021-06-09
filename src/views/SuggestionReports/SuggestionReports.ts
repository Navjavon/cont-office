import {Component, Vue} from 'vue-property-decorator';
import ReportFilter from '@/components/report-filter/ReportFilter.vue';
import ReportSuggestionTable from '@/components/report-suggestion-table/ReportSuggestionTable.vue';
import SuggestionService from '@/services/suggestion.service';
import GroupService from '@/services/group.service';

@Component({
  name: 'report-complaints',
  components: {
    ReportFilter,
    ReportSuggestionTable,
  }
})
export default class SuggestionReports extends Vue {
  filter: IFilter = {};
  groups: IGroup[] = [];
  reportSuggestion: ISuggestionReport[] = [];

  async beforeMount() {
    this.groups = await GroupService.getSuggestionGroups();
    await this.getReportSuggestion();
  }

  async onSearchButtonClick(newFilter: IFilter) {
    this.filter = {
      ...this.filter,
      ...newFilter
    };
    await this.getReportSuggestion();
  }

  async getReportSuggestion() {
    this.reportSuggestion = await SuggestionService.getFullReport(this.filter);
  }
}
