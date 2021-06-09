import {Component, Emit, Vue, Watch} from 'vue-property-decorator';
import {getTimeStamp} from '@/utils/getTimeStamp';

import StatusService from '@/services/status.service';
import GroupService from '@/services/group.service';

import ShortcutDataFilter from '@/components/shortcut-date-filter/ShortcutDateFilter.vue';
import DateFilter from '@/components/date-filter/DateFilter.vue';
import {IShortcutReturn} from '@/utils/date';
import bus from '@/services/event-bus';

@Component({
    name: 'complaint-filter',
    components: {
        ShortcutDataFilter,
        DateFilter
    }
})
export default class ComplaintFilter extends Vue {
    showFilter: boolean = false;

    from: string = '';
    to: string = '';
    search: string = '';
    selectedStatus: number = 0;
    selectedGroup: number = 0;
    statuses: IIdName[] = [];
    complaintGroups: IGroup[] = [];
    async beforeMount() {
        this.statuses = await StatusService.getActiveItems();
        this.complaintGroups = await GroupService.getActiveComplaints();
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
            selectedStatus,
            selectedGroup,
            search
        } = this;

        return {
            from: getTimeStamp(from),
            to: getTimeStamp(to, true),
            statusId: selectedStatus,
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

    onResetFilter() {
        this.from = '';
        this.to = '';
        this.search = '';
        this.selectedStatus = 0;
        this.selectedGroup = 0;
        bus.$emit('reset');
    }
}
