import Vue from 'vue';
import Component from 'vue-class-component';
import AccountService from '@/services/account.service';
import './Login.css';
import {Routes} from '@/store/routes';
import bus from '@/services/event-bus';

@Component
export default class LoginComponent extends Vue {
  loading = false;

  loginData: IUserLogin = {
    username: '',
    password: ''
  };

  hidePassword = true;

  valid = true;

  rules = {
    required: (value: any) => !!value || 'Хатмист.'
  };

  async login() {
    const error = await AccountService.login(this.loginData);
    if (!error) {
      bus.$emit('enter');
      this.$router.push(Routes.Desktop);
    }
  }
}
