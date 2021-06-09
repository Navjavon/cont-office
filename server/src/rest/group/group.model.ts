import database from '@database';
import {n, e} from '@helpers/sqlite';

export default class GroupModel implements Model {
    public static create = async (group: IGroup): Promise<IResultQuery> => {
        const {
            name,
            type,
            parent
        } = group;

        return database.run(`
            INSERT INTO groups
                (name, type, parent)
            VALUES
                ('${e(name)}', ${type}, ${n(parent)})
        `);
    };

    public static delete = async (id: number): Promise<IResultQuery> => {
        return database.run(`UPDATE groups SET isDeleted = 1 WHERE id = ${id}`);
    };

    public static readAll = async (type?: number): Promise<IResultQuery<IGroup[]>> => {
        return database.all<IGroup[]>(`
            SELECT
                id,
                name,
                type,
                parent,
                isActive
            FROM groups WHERE isDeleted = ${0}
            ${type ? 'AND type = ' + type : ''}
        `);
    };

    public static update = async (group: IGroup): Promise<IResultQuery> => {
        const {
            id,
            name,
            type,
            parent,
            isActive
        } = group;

        return database.run(`
            UPDATE groups SET
                name = '${e(name)}',
                type = ${type},
                parent = ${parent},
                isActive = ${n(isActive)}
            WHERE id = ${id}
        `);
    };
}
