import database from '@database';
import {e} from '@helpers/sqlite';

class UserModel implements IModel<IResultQuery> {
    get selectAllQuery() {
        return `
            SELECT
                ID as id,
                username,
                firstName,
                lastName,
                position,
                password,
                type,
                isActive
            FROM
                users
            WHERE
                isDeleted = ${0}
        `;
    }

    create = async (user: IUser): Promise<IResultQuery> => {
        const {
            username,
            firstName,
            lastName,
            position,
            password,
            type
        } = user;

        return database.run(`
            INSERT INTO users
                (username, firstName, lastName, position, password, type)
            VALUES
                ( '${e(username)}', '${e(firstName)}', '${e(lastName)}', '${e(position)}', '${password}', ${type})
        `);
    };

    readAll = async (): Promise<IResultQuery<IUser[]>> => {
        return database.all<IUser[]>(
            this.selectAllQuery
        );
    };

    delete = async (username: number): Promise<IResultQuery> => {
        return database.run(`
            UPDATE users SET
                isDeleted = 1
            WHERE
                username = '${username}'
        `);
    };
}

export default new UserModel();
