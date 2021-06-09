import database from '@database';
import {n, e} from '@helpers/sqlite';

export default class DepartmentModel implements Model {
    public static create = async ({name, parent, chief}: IDepartment): Promise<IResultQuery> => {
        return database.run(`
             INSERT INTO department
                (name, parent, chief)
            VALUES
                ('${e(name)}', ${n(parent)}, ${n(chief)})
        `);
    };

    public static delete = async (id: number): Promise<IResultQuery> => {
        return database.run(`UPDATE department SET isDeleted = 1 WHERE id = ${id}`);
    };

    public static readAll = async (): Promise<IResultQuery<IDepartment[]>> => {
        return database.all<IDepartment[]>(`
            SELECT
                id,
                name,
                parent,
                chief,
                isActive
            FROM department WHERE ${1}
        `);
    };

    public static update = async (department: IDepartment): Promise<IResultQuery> => {
        const {
            id,
            name,
            parent,
            chief,
            isActive
        } = department;

        return database.run(`
            UPDATE department SET
                name = '${e(name)}',
                parent = ${n(parent)},
                chief = ${n(chief)},
                isActive = ${n(isActive)}
            WHERE id = ${id}
        `);
    };
}
