import {Component, Vue} from 'vue-property-decorator';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';
import AddEditModal from '@/components/add-edit/AddEditModal.vue';
import {IAddEditModalType} from '@/components/add-edit/AddEditModal.types';
import {IConfirmModalType} from '@/components/confirm-modal/ConfirmModal.types';
import GroupService from '@/services/group.service';

@Component({
    components: {
        ConfirmModal,
        AddEditModal
    }
})
export default class ComplaintsReasonComponent extends Vue {
    addEditData: IAddEditModalType = {} as any;
    confirmData: IConfirmModalType = {} as any;
    filteredGroups: IGroup[] = [];
    showAddEdit = false;
    private parentCategory: IGroup[] = [];
    private groups: IGroup[] = [];
    private searchValue = '';
    private idx = -1;

    get search(): string {
        return this.searchValue;
    }

    set search(value: string) {
        this.searchValue = value;
        this.findGroup(value);
    }

    async mounted() {
        await this.getGroups();
    }

    addNewGroup() {
        this.addEditData = {
            addNew: true,
            show: true,
            type: 'group',
            data: {group: null, parents: this.parentCategory}
        };
        this.showAddEdit = true;
    }

    editGroup(idx: number) {
        this.idx = idx;
        this.addEditData = {
            addNew: false,
            show: true,
            type: 'group',
            data: {group: {...this.groups[idx]}, parents: this.parentCategory}
        };
        this.showAddEdit = true;
    }

    deleteGroup(idx: number) {
        this.idx = idx;
        this.confirmData = {
            show: true,
            message: 'Дар хакикат Шумо сабтро тоза кардан мехохед?'
        };
    }

    async onCloseAddModal(data: any) {
        if (data) {
            this.showAddEdit = data.show;

            if (!data.data) {
                return;
            }

            if (this.addEditData.addNew) {
                await this.getGroups();
            } else {
                this.filteredGroups.splice(this.idx, 1, data.data);
            }
        }
    }

    async onCloseConfirm(value: any) {
        const {result} = value;
        if (result) {
            const id = this.groups[this.idx].id;
            const err = await GroupService.deleteRemoveReason(id);

            if (!err) {
                this.filteredGroups.splice(this.idx, 1);
                this.filteredGroups = this.groups;
            }
        }

    }

    private findGroup(value: string) {
        if (!value) {
            this.filteredGroups = this.groups;
            return;
        }

        value = value.toLowerCase();
        this.filteredGroups = this.groups.filter(({name}) => (
            name.toLowerCase().includes(value)
        ));
    }

    private async getGroups() {
        this.groups = this.filteredGroups = await GroupService.complaints(true);
        this.parentCategory = this.groups.filter((group) => group.parent === null);
    }
}
