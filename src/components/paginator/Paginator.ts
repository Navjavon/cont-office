import {Component, Prop, Vue, Emit, Watch} from 'vue-property-decorator';

@Component({
    name: 'paginator'
})
export default class Paginator extends Vue {
    @Prop({default: 0})
    pages: number;

    @Prop({default: 1})
    pageProp;

    page: number = 1;

    @Watch('pageProp')
    onNewProp(page: number) {
        this.page = page;
    }

    @Watch('page')
    @Emit()
    onPageChange(newValue: number) {
        return newValue;
    }
}
