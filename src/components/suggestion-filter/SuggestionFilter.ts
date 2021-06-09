import {Component, Emit, Vue, Watch} from 'vue-property-decorator';
import {getTimeStamp} from '@/utils/getTimeStamp';

import GroupService from '@/services/group.service';
import ShortcutDataFilter from '@/components/shortcut-date-filter/ShortcutDateFilter.vue';
import DateFilter from '@/components/date-filter/DateFilter.vue';
import {IShortcutReturn} from '@/utils/date';
import bus from '@/services/event-bus';

@Component({
  name: 'suggestion-filter',
  components: {
    ShortcutDataFilter,
    DateFilter
  }
})
export default class SuggestionFilter extends Vue {
  showFilter: boolean = false;

  from: string = '';
  to: string = '';
  search: string = '';
  selectedGroup: number = 0;

  suggestionGroups: IGroup[] = [];

  async beforeMount() {
    this.suggestionGroups = await GroupService.getSuggestionGroups();
    this.suggestionGroups = this.suggestionGroups.filter((item) => item.isActive);
  }

  @Watch('search')
  @Emit()
  onSearch(newValue: string) {
    return newValue;
  }

  @Emit()
  onSearchButtonClick(_: Event): IFilter {
    const {
      from,
      to,
      selectedGroup,
      search
    } = this;

    return {
      from: getTimeStamp(from),
      to: getTimeStamp(to, true),
      groupId: selectedGroup,
      text: search
    }
  }

  onShortcutChange({first, last}: IShortcutReturn) {
    this.from = first;
    this.to = last;
  }

  onFromChange(from: string) {
    this.from = from;
  }

  onToChange(to: string) {
    this.to = to;
  }

  resetFilter() {
    this.from = '';
    this.to = '';
    this.search = '';
    this.selectedGroup = 0;
    bus.$emit('reset');
  }
}
