import {Component, Prop, Vue} from 'vue-property-decorator';

import GroupService from '@/services/group.service';
import SuggestionService from '@/services/suggestion.service';

import {getTimeStamp} from '@/utils/getTimeStamp';
import {ESuggestion}  from '@/store/e-suggestion';
import dateToISOString, {formattedDate} from '@/utils/date';
import {Routes} from '@/store/routes';
import bus from '@/services/event-bus';

@Component
export default class NewSuggestion extends Vue {
  panel: number[] = [0, 1, 2];
  date: string = '';
  menu = false;
  complaints = '';
  suggestionGroups: IGroup[] = [];

  @Prop({default: () => JSON.parse(JSON.stringify(ESuggestion))})
  suggestion: ISuggestion;

  @Prop({default: true})
  isNewSuggestion: boolean;

  error = false;
  rule = {
    required: (value: any) => !!value || 'Ҳатмист.'
  };

  async beforeMount() {
    this.suggestionGroups = await GroupService.getSuggestionGroups();
    this.suggestionGroups = this.suggestionGroups.filter((item) => item.isActive);

    const {date} = this.suggestion;
    this.date = dateToISOString(date);
  }

  formattedDate(date: string) {
    return formattedDate(date);
  }

  async onSubmit(_: Event) {
    const {suggestion, isNewSuggestion} = this;
    suggestion.date = getTimeStamp(this.date);

    const error = isNewSuggestion ?
        await SuggestionService.createSuggestion(suggestion) :
        await SuggestionService.updateSuggestion(suggestion);

    if (error) {
      Object.keys(error).forEach((field) => {
        // @ts-ignore
        this.$refs[field].validate(true);
      });
      return;
    }

    if (isNewSuggestion) {
      this.$router.push(Routes.Suggestions);
      return;
    }

    const {group: {id: newGroupId}} = suggestion;
    const group = this.suggestionGroups.find(({id}) => id === newGroupId);
    suggestion.group.name = group?.name;
    bus.$emit('suggestionUpdated', suggestion);
  }
}
