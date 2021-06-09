import {Component, Prop, Vue} from 'vue-property-decorator';
import getSum from '@/utils/getSum';

@Component({
  name: 'report-suggestion-table'
})
export default class ReportSuggestionTable extends Vue {
  @Prop({default: []})
  reportSuggestion: ISuggestionReport[];

  @Prop({default: []})
  groups: IGroup[];

  getSum(reportSuggestion: ISuggestionReport[]) {
    return getSum(reportSuggestion);
  }

  getGroupName(groupId: number) {
    const group = this.groups.find((g) => g.id === groupId);
    return group?.name || '';
  }
}
