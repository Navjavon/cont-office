import database from '@database';
import {n, e} from '@helpers/sqlite';

export default class StatusModel implements Model {
    public static create = async ({name}: IStatus): Promise<IResultQuery> => {
        return database.run(`
            INSERT INTO status
                (name)
            VALUES
                ('${e(name)}')
        `);
    };

    public static delete = async (id: number): Promise<IResultQuery> => {
        return database.run(`UPDATE status SET isDeleted = 1 WHERE id = ${id}`);
    };

    public static readAll = async (): Promise<IResultQuery<IStatus[]>> => {
        return database.all<IStatus[]>(`SELECT id, name, isActive FROM status WHERE isDeleted = ${0}`);
    };

    public static update = async (status: IStatus): Promise<IResultQuery> => {
        const {
            id,
            name,
            isActive
        } = status;

        return database.run(`
            UPDATE status SET
                name ='${e(name)}',
                isActive = ${n(isActive)}
            WHERE id = ${id}
        `);
    };
}
