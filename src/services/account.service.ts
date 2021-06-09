import http from '@/utils/http';
import {emitMessage, emitMessageInfo} from './event-bus';
import {navbarItems, settings} from '@/store/navbarItems';
import {readCookie} from '@/utils/cookie';
import bus from '@/services/event-bus';

export class AccountService {
    user: IUser = null;

    async isAuthorised(): Promise<boolean> {
        let err = false;
        if (!this.user) {
            err = await this.getProfile();
        }
        return !err && !!readCookie('is_authorised');
    }

    async getProfile(): Promise<boolean> {
        let err = false;

        try {
            const {data} = await http.get<IUser>('account');
            this.user = data;
            bus.$emit('updateUser', data);

            if (this.isAdmin()) {
                navbarItems.push(settings);
            }
        } catch (e) {
            err = true;
        }

        return err;
    }

    async login(loginData: IUserLogin): Promise<boolean> {
        let err = false;
        let msg: string;

        try {
            await http.post('account/login', loginData);
            await this.getProfile();
            msg = 'Хуш омадед!';
        } catch (e) {
            msg = e.response.data.message;
            err = true;
        }

        emitMessageInfo(msg, err);
        return err;
    }

    @emitMessage()
    async logOut(): Promise<boolean> {
        const idx = navbarItems.findIndex(
          ({text}) => text === 'Танзимот'
        );

        if (idx !== -1) {
            navbarItems.splice(idx, 1);
        }

        return await http.get('account/logout');
    }

    @emitMessage()
    updateUser(userData: IUser): Promise<boolean> {
        return http.put('account', userData);
    }

    @emitMessage()
    updatePassword(passData: IAccountUpdatePassword): Promise<boolean> {
        return http.put('account/password', passData);
    }

    isAdmin(): boolean {
        return this.user.type === 2;
    }
}

export default new AccountService();
