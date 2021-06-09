import {Component, Vue} from 'vue-property-decorator';
import {CompanyService} from '@/services/company.service';

@Component({
    name: 'company-view'
})
export default class CompanyView extends Vue {
    companyName: string = '';
    async beforeMount() {
        this.companyName = await CompanyService.getCompanyName();
    }

    async updateName() {
        await CompanyService.updateCompanyName(this.companyName);
    }
}
