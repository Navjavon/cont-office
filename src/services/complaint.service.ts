import {COMPLAINTS} from '@/store/api-constants';
import http from '@/utils/http';
import {emitMessage} from '@/services/event-bus';

interface IComplaintReturn<T = IComplaint> {
    complaints: T[];
    pages: number;
}

export default class ComplaintService {
    static async getComplaintsByFilter(filter: IFilter): Promise<IComplaintReturn> {
        let data = {complaints: [], pages: 0};
        try {
            const response = await http.get<IComplaintReturn>(COMPLAINTS, {params: filter});
            data = response.data;
        } catch (e) {
            console.log('Error while getting complaints', e);
        }
        return data;
    }

    static async getFullReport(filter: IFilter): Promise<IComplaintFullReport[]> {
        let data: IComplaintFullReport[] = [];
        try {
            ({data} = await http.get<IComplaintFullReport[]>(`${COMPLAINTS}/report/full`, {params: filter}));
        } catch (e) {
            console.log('Error while getting full complaints report', e)
        }
        return data;
    }

    static async getShortReport(): Promise<IComplaintFullReport[]> {
        let data: IComplaintFullReport[] = [];
        try {
            ({data} = await http.get<IComplaintFullReport[]>(`${COMPLAINTS}/report/short`));
        } catch (e) {
            console.log('Error while getting short complaints report', e)
        }
        return data;
    }

    static async getNewNumber(): Promise<INewNumber> {
        let data: INewNumber = {newNumber: 0};
        try {
            ({data} = await http.get<INewNumber>(`${COMPLAINTS}/newnumber`));
        } catch (e) {
            console.log('Error while getting short complaints report', e)
        }
        return data;
    }

    @emitMessage()
    static deleteComplaint(complaint: IComplaintDelete) {
        return http.delete(`${COMPLAINTS}/${complaint.id}`, {data: complaint});
    }

    @emitMessage(true)
    static createComplaint(complaint: IComplaint): Promise<boolean> {
        return http.post(COMPLAINTS, complaint);
    }

    @emitMessage(true)
    static updateComplaint(complaint: IComplaint): Promise<boolean> {
        return http.put(`${COMPLAINTS}/${complaint.id}`, complaint);
    }

    static async getAllDeleted(page: number): Promise<IComplaintReturn<IComplaintDeleted>> {
        let data = {complaints: [], pages: 0};
        try {
            ({data} = await http.get<IComplaintReturn<IComplaintDeleted>>(`${COMPLAINTS}/deleted/${page}`));
        } catch (e) {
            console.log('Error while getting deleted complaints', e)
        }
        return data;
    }
}
