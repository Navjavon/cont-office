import {Component, Emit, Vue, Watch, Prop} from 'vue-property-decorator';
import {formattedDate} from '@/utils/date';

@Component({
    name: 'date-filter'
})
export default class ShortcutDateFilter extends Vue {
    menu = false;
    date: string = '';

    @Prop({default: ''})
    dateProp: string;

    @Prop({default: ''})
    label: string;

    @Watch('dateProp')
    onNewProp(date: string) {
        this.date = date;
    }

    @Watch('date')
    @Emit()
    onDateChange(date: string) {
        return date;
    }

    formattedDate(date: string) {
        return formattedDate(date);
    }
}
