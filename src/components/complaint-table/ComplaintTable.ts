import {Component, Prop, Vue, Emit} from 'vue-property-decorator';

@Component({
  name: 'complaint-table'
})
export default class ComplaintTable extends Vue {
    @Prop({default: []})
    complaints: IComplaint[];

    @Prop({default: 0})
    page;

    @Emit()
    onDeleteClick(id: number) {
        return id;
    }

    @Emit()
    onPreviewClick(complaint: IComplaint) {
        return complaint;
    }

    @Emit()
    onPrintClick(complaint: IComplaint) {
        return complaint;
    }

    @Emit()
    onEditClick(complaint: IComplaint) {
        return complaint;
    }
}
