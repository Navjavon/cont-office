import {Component, Vue} from 'vue-property-decorator';
import SuggestionFilter from '@/components/suggestion-filter/SuggestionFilter.vue';
import Paginator from '@/components/paginator/Paginator.vue';
import SuggestionTable from '@/components/suggestion-table/SuggestionTable.vue';
import SuggestionService from '@/services/suggestion.service';
import {ESuggestion} from '@/store/e-suggestion';
import NewSuggestion from '@/views/NewSuggestion/NewSuggestion.vue';
import {IConfirmModalType} from '@/components/confirm-modal/ConfirmModal.types';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';
import bus from '@/services/event-bus';

@Component({
    name: 'Suggestions',
    components: {
        SuggestionTable,
        SuggestionFilter,
        NewSuggestion,
        Paginator,
        ConfirmModal
    }
})
export default class SuggestionView extends Vue {
    pages: number = 0;
    editDialog: boolean = false;
    suggestions: ISuggestion[] = [];
    suggestionId: number = 0;
    selectedSuggestion: ISuggestion = ESuggestion;
    copiedFilter = null;
    filter: IFilter = {};
    confirmData: IConfirmModalType = {} as any;

    async mounted() {
        this.copiedFilter = {...this.filter};
        await this.getSuggestions();
        bus.$on('reset', async () => {
            this.filter = this.copiedFilter;
            await this.getSuggestions();
        });

        bus.$on('suggestionUpdated', (updatedSuggestion) => {
            const suggestions = this.suggestions.slice();
            let componentId = suggestions.findIndex(({id}) => id === updatedSuggestion.id);
            if (componentId !== -1) {
                suggestions[componentId] = updatedSuggestion;
                this.suggestions = suggestions;
            }
            this.editDialog = false;
        });
    }

    async onPageChange(page: number) {
        this.filter.page = page;
        await this.getSuggestion();
    }

    async onSearch(search: string) {
        this.filter.text = search;
        this.filter.page = 1;
        await this.getSuggestion();
    }

    async onSearchButtonClick(newFilter: IFilter) {
        this.filter = {
            ...this.filter,
            ...newFilter
        };

        this.filter.page = 1;
        await this.getSuggestion();
    }

    async getSuggestion() {
        const {
            suggestions,
            pages
        } = await SuggestionService.getSuggestionByFilter(this.filter);

        this.suggestions = suggestions;
        this.pages = pages;
    }

    onEditClick(suggestion: ISuggestion) {
        this.selectedSuggestion = JSON.parse(JSON.stringify(suggestion));
        this.editDialog = true;
    }

    onDeleteClick(id: number) {
        this.suggestionId = id;
        this.confirmData = {show: true, message: 'Шумо дар ҳақиқат мехоҳед пешниҳодро нест кунед?'};
    }

    async onCloseConfirm(data: any) {
        if (data.result) {
            const suggestion: any = {
                id: this.suggestionId
            };
            try {
                await SuggestionService.deleteSuggestion(suggestion);
                this.onSuggestionsDelete(data.result);
            } catch (e) {
                console.log('Error while deleting  suggestion', e);
            }
        }
    }

    onSuggestionsDelete(result: boolean) {
        let {
            suggestions,
            suggestionId
        } = this;

        if (result) {
            const index = suggestions.findIndex(({id}) => id === suggestionId);
            if (index !== -1) {
                this.suggestions.splice(index, 1);
            }
        }
    }

    private async getSuggestions() {
        const {
            suggestions,
            pages
        } = await SuggestionService.getSuggestionByFilter(this.filter);
        this.suggestions = suggestions;
        this.pages = pages;
    }
}
