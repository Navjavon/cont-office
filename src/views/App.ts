import {Component, Vue, Watch} from 'vue-property-decorator';
import {RouteConfig} from 'vue-router';
import {navbarItems} from '@/store/navbarItems';
import Navbar from '@/components/navbar/Navbar.vue';
import AccountService from '@/services/account.service';
import {INewUserData} from '@/components/new-user/NewUser.types';
import NewUserComponent from '@/components/new-user/NewUser.vue';
import bus from '@/services/event-bus';
import ComplaintService from '@/services/complaint.service';
import getSum from '@/utils/getSum';
import {Routes} from '@/store/routes';
import {Pages} from '@/store/pages';

@Component({
  name: 'main-layout',
  components: {
    Navbar,
    NewUserComponent
  }
})
export default class App extends Vue {
  pageName: string = '';
  showProfile = false;
  userComponentData: INewUserData = {} as any;
  navbarItems: INavbarComplexItem[] = navbarItems;
  infoMsg: string = '';
  isError = false;
  showMsg = false;
  user: IUser = {
    position: '',
    firstName: ''
  } as any;

  complaintsCount: number = 0;

  @Watch('$route', {immediate: true, deep: true})
  onUrlChange({path}: RouteConfig) {
    const last = path.length - 1;
    if (path[last] === '/' && path !== Routes.Desktop) {
      path = path.slice(0, -1);
    }
    this.pageName = Pages[path]?.name || '';
  }

  async beforeMount() {
    this.getNotifyCounts();
  }

  @Watch('complaintsCount')
  updateNavbarItems() {
    const complaints = this.navbarItems.find(({route}) => route.includes('complaints'));
    const activeComplaints = complaints.items?.find(({route}) => route === Routes.ActiveComplaints);
    activeComplaints.count = this.complaintsCount;
  }

  async mounted() {
    bus.$on('messageInfo', ({message, error}) => {
      this.infoMsg = message;
      this.isError = error;
      this.showMsg = true;
    });

    bus.$on('enter', async () => this.getNotifyCounts());
    bus.$on('newComplaint', () => this.complaintsCount++);
    bus.$on('complaintEdited', () => this.complaintsCount--);
    bus.$on('updateUser', (user) => {
      this.user = user;
    })
  }

  beforeDestroy() {
    bus.$off('enter');
    bus.$off('messageInfo');
    bus.$off('newComplaint');
    this.showMsg = false;
  }

  onShowProfile() {
    this.userComponentData = {
      addNew: false,
      isProfile: true,
      user: {...AccountService.user}
    };
    this.showProfile = true;
  }

  onCloseNewUserDialog(data: any) {
    if (!data) {
      return;
    }

    const {user, show} = data;
    this.showProfile = show;

    if (user) {
      AccountService.user = user;
    }
  }

  async onLogOut() {
    const err = await AccountService.logOut();
    if (!err) {
      this.$router.push(Routes.Login);
    }
  }

  private async getNotifyCounts() {
    const complaints = await ComplaintService.getShortReport();
    this.complaintsCount = getSum(complaints);

    this.updateNavbarItems();
  }
}
