import http from '@/utils/http';
import {emitMessage} from '@/services/event-bus';

export class CompanyService {
    static async getCompanyName(): Promise<string> {
        try {
            const {data: {name}} = await http.get<ICompany>('company');
            return name;
        } catch (e) {
            console.log('Error while getting company name', e);
        }

        return '';
    }

    @emitMessage()
    static updateCompanyName(name: string): Promise<boolean> {
        return http.put('company', {name});
    }
}
