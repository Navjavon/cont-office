import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {getFirstAndLastDay} from '@/utils/date';
import ShortcutDataFilter from '@/components/shortcut-date-filter/ShortcutDateFilter.vue';
import {Shortcuts, shortcuts} from '@/store/shortcuts';
import bus from '@/services/event-bus';

@Component({
    name: 'shortcut-date-filter',
    components: {
        ShortcutDataFilter
    }
})
export default class ShortcutDateFilter extends Vue {
    shortcuts = shortcuts;
    selectedShortcut: string = 'all';

    @Watch('selectedShortcut')
    @Emit()
    onShortcutChange(shortcut: Shortcuts) {
        return getFirstAndLastDay(shortcut);
    }

    mounted() {
        bus.$on('reset', () => this.selectedShortcut = 'all');
    }
}
