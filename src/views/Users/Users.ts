import {Component, Vue} from 'vue-property-decorator';
import UserService from '@/services/user.service';
import {IUserData} from '@/views/Users/Users.types';
import ConfirmModal from '@/components/confirm-modal/ConfirmModal.vue';
import {IConfirmModalType} from '@/components/confirm-modal/ConfirmModal.types';
import NewUserComponent from '@/components/new-user/NewUser.vue';
import {INewUserData} from '@/components/new-user/NewUser.types';

@Component({
  components: {
    ConfirmModal,
    NewUserComponent
  }
})
export default class UsersComponent extends Vue {
  showNewUser = false;
  users: IUser[] = [];
  confirmDialog = false;
  filteredUsers: IUserData[] = [];
  confirmData: IConfirmModalType = {} as any;
  userComponentData: INewUserData = {} as any;
  private selectedUserName = '';
  private searchValue = '';

  get search(): string {
    return this.searchValue;
  }

  set search(value: string) {
    this.searchValue = value;
    this.searchUser(value);
  }

  async mounted() {
    await this.getFilteredUsers();
  }

  async onCloseConfirm({result}: any) {
    if (!result) {
      return;
    }

    this.confirmDialog = false;
    const err = await UserService.deleteUser(this.selectedUserName);

    if (!err) {
      await this.getFilteredUsers();
    }
  }

  async onCloseNewUserDialog(data: any) {
    if (!data) {
      return;
    }

    const {user, show} = data;
    this.showNewUser = show;

    if (user) {
      await this.getFilteredUsers();
    }
  }

  onAddNewUser() {
    this.showNewUser = true;
    this.userComponentData = {
      addNew: true,
      isProfile: false,
      user: null
    };
  }

  onEditUser(userName: string) {
    this.showNewUser = true;
    const user = this.users.filter(({username}) => username === userName)[0];
    this.userComponentData = {
      addNew: false,
      isProfile: false,
      user: {...user}
    };
  }

  onDeleteUser(username: string) {
    this.selectedUserName = username;
    this.confirmData = {
      show: true,
      message: 'Шумо дар хакикат сабтро нест кардан мехохед ?'
    };
    this.confirmDialog = true;
  }

  private async searchUser(value: string) {
    if (!value) {
      await this.getFilteredUsers();
      return;
    }

    value = value.toLowerCase();
    this.filteredUsers = this.filteredUsers.filter(({name, phone}) => (
      name.toLowerCase().includes(value) || phone.toLowerCase().includes(value)
    ));
  }

  private async getFilteredUsers() {
    this.users = await UserService.getUsers();
    this.filteredUsers = this.users.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      phone: user.username,
      isOperator: user.type === 1,
      isAdmin: user.type === 2,
      isActive: user.isActive
    }));
  }
}
