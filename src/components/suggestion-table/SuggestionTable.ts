import {Component, Prop, Vue, Emit} from 'vue-property-decorator';

@Component({
  name: 'suggestion-table'
})
export default class SuggestionTableView extends Vue {
  @Prop({default: []})
  suggestion: ISuggestion[];

  @Emit()
  onDeleteClick(id: number) {
    return id;
  }

  @Emit()
  onEditClick(suggestion: ISuggestion) {
    return suggestion;
  }
}
