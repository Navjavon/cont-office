import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import {INewUserData, ISelectionOption} from '@/components/new-user/NewUser.types';
import AccountService from '@/services/account.service'
import UserService from '@/services/user.service';
import bus from '@/services/event-bus';

@Component({
  name: 'new-user-component'
})
export default class NewUserComponent extends Vue {
  newUserData: INewUserData = {
    addNew: true,
    isProfile: false,
    user: {
      firstName: '',
      lastName: '',
      position: '',
      username: '',
      password: '',
      type: 2
    }
  };
  selectionOptions: ISelectionOption = {
    isAdministrator: true,
    isOperator: false,
    isActive: true,
  };
  hidePass = true;
  password1 = '';
  password2 = '';
  valid = true;
  show = false;
  isAdmin = false;
  changePass = false;

  admin = false;

  rules = {
    required: (value: string) => !!value || 'Хатмист'
  };

  @Prop()
  userData: INewUserData;

  @Watch('userData', {immediate: true})
  getData() {
    setTimeout(() => {
      this.show = !!this.userData;
    }, 0);
    this.isAdmin = this.userData.isProfile && AccountService.isAdmin();
    this.admin = AccountService.isAdmin();

    if (!this.userData.addNew) {
      this.newUserData = {...this.userData};
      this.userData.user = {...this.userData.user};
      this.selectionOptions = {
        isAdministrator: this.newUserData.user.type === 2,
        isOperator: this.newUserData.user.type === 1,
        isActive: this.newUserData.user.isActive
      };
    }
  }

  @Emit()
  async onCloseUserDialog(cancel = false) {
    if (cancel) {
      return this.onCancel();
    }

    let err = null;
    if (this.userData.addNew) {
      err = await this.addNewUser();
    } else if (!this.isAdmin) {
      err = await this.updateUser();
    } else {
      err = await this.updateCurrentUser();
    }

    if (!err) {
      bus.$emit('updateUser', this.newUserData.user);
      const changed = this.passChanged() || this.userHasChanged();
      const data = changed ? this.newUserData.user : null;
      return {user: data, show: false};
    }
  }

  onEditPassClick() {
    this.changePass = true;
    this.newUserData.addNew = !this.newUserData.addNew
  }

  onCancel() {
    return {user: null, show: false};
  }

  onChangePosition(evt: any, label: number) {
    if (evt && label === 1) {
      this.selectionOptions.isOperator = false;
    } else if (evt && label === 2) {
      this.selectionOptions.isAdministrator = false;
    }
  }

  private async addNewUser(): Promise<boolean> {
    this.newUserData.user.password = this.password1;
    this.onSetUserData();
    let newUser = {
      ...this.newUserData.user,
      ...{
        password2: this.password1
      }
    };
    return await UserService.addNewUser(newUser);
  }

  private async updateUser(): Promise<boolean> {
    let err = false;
    this.onSetUserData();
    const passChange = this.passChanged();
    if (this.userHasChanged() || passChange) {
      if (passChange) {
        this.newUserData.user.password = this.password1;
      }
      err = await UserService.updateUser(this.userData.user.username, this.newUserData.user);
    }
    return err;
  }

  private async updateCurrentUser(): Promise<boolean> {
    let err = false;
    this.onSetUserData();
    if (this.userHasChanged()) {
      err = await AccountService.updateUser(this.newUserData.user);
    }

    if (this.passChanged() && !err) {
      if (this.isAdmin) {
        const passData: IAccountUpdatePassword = {
          password: this.password1,
          password2: this.password2
        };
        err = await AccountService.updatePassword(passData);
      }
    }

    return err;
  }

  private onSetUserData() {
    const user = this.newUserData.user;
    user.type = this.selectionOptions.isAdministrator ? 2 : 1;
    user.isActive = this.selectionOptions.isActive;
    if (this.passChanged()) {
      user.password = this.password1;
    }
  }

  private userHasChanged(): boolean {
    const oldUser = this.userData.user;
    const user = this.newUserData.user;
    return user.username !== oldUser.username ||
      user.firstName !== oldUser.firstName ||
      user.lastName !== oldUser.lastName ||
      user.position !== oldUser.position ||
      user.isActive !== oldUser.isActive ||
      user.type !== oldUser.type;
  }

  private passChanged(): boolean {
    return !!this.password1;
  }
}
