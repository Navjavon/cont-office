import http from '@/utils/http';
import {SUGGESTION} from '@/store/api-constants';
import {emitMessage} from '@/services/event-bus';

interface ISuggestionReturn {
    suggestions: ISuggestion[];
    pages: number;
}

export default class SuggestionService {
    @emitMessage(true)
    static createSuggestion(suggestion: ISuggestion): Promise<boolean> {
        return http.post(SUGGESTION, suggestion);
    }

    @emitMessage(true)
    static updateSuggestion(suggestion: ISuggestion): Promise<boolean> {
        return http.put(`${SUGGESTION}/${suggestion.id}`, suggestion);
    }

    static async getSuggestionByFilter(filter: IFilter): Promise<ISuggestionReturn> {
        let data;
        try {
            const response = await http.get<ISuggestionReturn>(SUGGESTION, {params: filter});
            data = response.data;
        } catch (e) {
            console.log('Error while getting complaints', e);
        }

        return data;
    }

    @emitMessage()
    static deleteSuggestion(suggestion: any) {
        return http.delete(`${SUGGESTION}/${suggestion.id}`, {data: suggestion});
    }

    static async getFullReport(filter?: IFilter): Promise<ISuggestionReport[]> {
        let data: ISuggestionReport[] = [];
        try {
            ({data} = await http.get<ISuggestionReport[]>(`${SUGGESTION}/report/full`, {params: filter}));
        } catch (e) {
            console.log('Error while getting full suggestions report', e);
        }
        return data;
    }

    static async getShortReport(): Promise<number> {
        let data: ICount = {count: 0};
        try {
            ({data} = await http.get<ICount>(`${SUGGESTION}/report/short`));
        } catch (e) {
            console.log('Error while getting short suggestions report', e);
        }
        return data.count;
    }
}
