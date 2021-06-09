import {GROUP_TYPES, GROUPS} from '@/store/api-constants';
import http from '@/utils/http';
import {emitMessage} from '@/services/event-bus';

class GroupService {
    private complaintGroups: IGroup[] = [];
    private complaintRemoveGroups: IGroup[] = [];

    async complaints(update = false): Promise<IGroup[]> {
        const {complaintGroups} = this;
        if (!complaintGroups.length || update) {
            await this.getComplaintGroups();
        }

        return this.complaintGroups;
    }

    async getActiveComplaints(): Promise<IGroup[]> {
        const items = await this.complaints();
        return items.filter((item) => item.isActive);
    }

    async complaintRemoveReasons(update = false): Promise<IGroup[]> {
        const {complaintRemoveGroups} = this;
        if (!complaintRemoveGroups.length || update) {
            await this.getComplaintRemoveGroups();
        }

        return this.complaintRemoveGroups;
    }

    async getActiveRemoveReasons(): Promise<IGroup[]> {
        const items = await this.complaintRemoveReasons();
        return items.filter((item) => item.isActive);
    }

    async getComplaintGroups() {
        try {
            const {data} = await http.get<IGroup[]>(`${GROUPS}/${GROUP_TYPES.COMPLAINT}`);
            this.complaintGroups = data;
        } catch (e) {
            console.log('Error while getting groups', e)
        }
    }

    async getComplaintRemoveGroups() {
        try {
            const {data} = await http.get<IGroup[]>(`${GROUPS}/${GROUP_TYPES.REMOVE_REASON}`);
            this.complaintRemoveGroups = data;
        } catch (e) {
            console.log('Error while getting groups', e)
        }
    }

    async getSuggestionGroups(): Promise<IGroup[]> {
        try {
            const {data} = await http.get<IGroup[]>(`${GROUPS}/${GROUP_TYPES.SUGGESTION}`);
            return data;
        } catch (e) {
            console.log('Error while getting groups', e)
        }
    }

    @emitMessage()
    addNewRemoveReason(groupData: IGroup): Promise<boolean> {
        return http.post(GROUPS, groupData);
    }

    @emitMessage()
    updateRemoveReason(id: number, groupData: IGroup): Promise<boolean> {
        return http.put(`${GROUPS}/${id}`, groupData);
    }

    @emitMessage()
    deleteRemoveReason(id: number): Promise<boolean> {
        return http.delete(`${GROUPS}/${id}`);
    }
}

export default new GroupService();
