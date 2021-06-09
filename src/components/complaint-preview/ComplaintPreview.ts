import {Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator';
import ComplaintPrint from '@/components/complaint-print/ComplaintPrint.vue';

@Component({
    name: 'complaint-preview',
    components: {
        ComplaintPrint
    }
})
export default class ComplaintPreview extends Vue {
    @Prop({default: true})
    show: boolean;
    dialog: boolean = false;

    @Prop({default: false})
    isDeleteComplaint: boolean;

    @Prop({default: {}})
    complaint: IComplaint;

    @Watch('show')
    onPropShowChange(newValue: boolean) {
        this.dialog = newValue;
    }

    @Watch('dialog')
    @Emit()
    onDialogChange(newValue: boolean) {
        return newValue
    }
}
