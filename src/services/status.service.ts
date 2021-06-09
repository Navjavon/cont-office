import {STATUS} from '@/store/api-constants';
import http from '@/utils/http';
import {emitMessage} from '@/services/event-bus';

class StatusService {
    private statuses: IStatus[] = [];

    async items(update = false): Promise<IStatus[]> {
        const {statuses} = this;
        if (!statuses.length || update) {
            await this.getAll();
        }

        return this.statuses;
    }

    async getActiveItems(): Promise<IStatus[]> {
        const items = await this.items();
        return items.filter((item) => item.isActive);
    }

    async getAll() {
        try {
            const {data} = await http.get<IStatus[]>(`${STATUS}`);
            this.statuses = data;
        } catch (e) {
            console.log('Error while getting statuses', e)
        }
    }

    @emitMessage()
    addStatus(statusData: IStatus): Promise<boolean> {
        return http.post(STATUS, statusData);
    }

    @emitMessage()
    updateStatus(id: number, statusData: IGroup): Promise<boolean> {
        return http.put(`${STATUS}/${id}`, statusData);
    }

    @emitMessage()
    deleteStatus(id: number): Promise<boolean> {
        return http.delete(`${STATUS}/${id}`);
    }
}

export default new StatusService();
