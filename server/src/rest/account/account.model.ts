import database from '@database';
import userModel from '../user/user.model';
import {e} from '@helpers/sqlite';

export default class AccountModel {
    public static read = async (username: string): Promise<IResultQuery<IUser>> => {
        return database.get<IUser>(`
            ${userModel.selectAllQuery}
            AND
                username = '${e(username)}'
        `);
    };

    public static update = async (user: IAccount): Promise<IResultQuery> => {
        const {
            username,
            firstName,
            lastName,
            position,
            type,
            isActive
        } = user;
        const active = isActive ? 1 : 0;
        return database.run(`
            UPDATE users SET
                firstName = '${firstName}',
                lastName = '${lastName}',
                position = '${position}',
                type = '${type}',
                isActive = '${active}'
            WHERE
                username = '${e(username)}'
        `);
    };

    public static updatePassword = async (password: string, username: string): Promise<IResultQuery> => {
        return database.run(`
            UPDATE users SET
                password = '${password}'
            WHERE
                username = '${e(username)}'
        `);
    };
}
