import {Component, Emit, Vue, Prop, Watch} from 'vue-property-decorator';
import {getTimeStamp} from '@/utils/getTimeStamp';
import ShortcutDataFilter from '@/components/shortcut-date-filter/ShortcutDateFilter.vue';
import DateFilter from '@/components/date-filter/DateFilter.vue';
import {IShortcutReturn} from '@/utils/date';
import GroupService from '@/services/group.service';
import bus from '@/services/event-bus';

@Component({
  name: 'report-complaint-filter',
  components: {
    ShortcutDataFilter,
    DateFilter
  }
})
export default class ReportFilter extends Vue {
  from: string = '';
  to: string = '';

  selectedGroup: number = 0;
  complaintGroups: IGroup[] = [];

  genders: IIdName[] = [{
    id: 1,
    name: 'Мард'
  },
  {
    id: 2,
    name: 'Зан'
  }];
  selectedGender: number = 0;

  @Prop({required: true})
  type: string;

  async beforeMount() {
    if (this.type === 'complaint') {
      this.complaintGroups = await GroupService.getActiveComplaints();
    }
  }

  @Watch('selectedGroup')
  @Emit()
  onGroupChange(newValue: number) {
    return newValue;
  }

  @Emit()
  onSearchButtonClick(_: Event) {
    return {
      gender: this.selectedGender,
      from: getTimeStamp(this.from),
      to: getTimeStamp(this.to, true)
    };
  }

  @Emit()
  onClearButtonClick() {
    this.from = '';
    this.to = '';
    this.selectedGender = 0;
    this.selectedGroup = 0;
    bus.$emit('reset');

    return {
      gender: 0,
      from: '',
      to: ''
    };
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
}
