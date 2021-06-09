import {USERS} from '@/store/api-constants';
import http from '@/utils/http';
import {emitMessage} from '@/services/event-bus';

export default class UserService {
    @emitMessage()
    static addNewUser(userData: IUser): Promise<boolean> {
        return http.post(USERS, userData);
    }

    static async getUsers(): Promise<IUser[]> {
        let user;
        try {
            const result = await http.get<IUser[]>(USERS);
            user = result.data;
        } catch (e) {
            console.log(e);
        }

        return user;
    }

    @emitMessage()
    static updateUser(userName: string, userData: IUser): Promise<boolean> {
        return http.put(`${USERS}/${userName}`, userData);
    }

    @emitMessage()
    static deleteUser(userName: string): Promise<boolean> {
        return http.delete(`${USERS}/${userName}`);
    }
}
