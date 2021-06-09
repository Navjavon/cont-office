import {REGIONS} from '@/store/api-constants';
import http from '@/utils/http';
import {emitMessage} from '@/services/event-bus';

class RegionService {
    private regions: IRegion[] = [];

    async items(get = false): Promise<IRegion[]> {
        const {regions} = this;
        if (!regions.length || get) {
            await this.getAll();
        }

        return this.regions;
    }

    async getActiveItems(): Promise<IRegion[]> {
        const items = await this.items();
        return items.filter((item) => item.isActive);
    }

    async getAll() {
        try {
            const {data} = await http.get<IRegion[]>(REGIONS);
            this.regions = data;
        } catch (e) {
            console.log('Error while getting regions', e)
        }
    }

    @emitMessage()
    addNewRegion(regionData: IRegion): Promise<boolean> {
        return http.post(REGIONS, regionData);
    }

    @emitMessage()
    updateRegion(id: number, regionData: IRegion): Promise<boolean> {
        return http.put(`${REGIONS}/${id}`, regionData);
    }

    @emitMessage()
    deleteRegion(id: number): Promise<boolean> {
        return http.delete(`${REGIONS}/${id}`);
    }
}

export default new RegionService();
