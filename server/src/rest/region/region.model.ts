import database from '@database';
import {n, e} from '@helpers/sqlite';

export default class RegionModel implements Model {
    public static create = async ({name}: IRegion): Promise<IResultQuery> => {
        return database.run(`
            INSERT INTO regions
                (name)
            VALUES
                ('${e(name)}')
        `);
    };

    public static delete = async (id: number): Promise<IResultQuery> => {
        return database.run(`UPDATE regions SET isDeleted = 1 WHERE id = ${id}`);
    };

    public static readAll = async (): Promise<IResultQuery<IRegion[]>> => {
        return database.all<IRegion[]>(`
            SELECT
                id,
                name,
                isActive
            FROM regions WHERE isDeleted = ${0}
        `);
    };

    public static update = async (region: IRegion): Promise<IResultQuery> => {
        const {
            id,
            name,
            isActive
        } = region;

        return database.run(`
            UPDATE regions SET
                name = '${e(name)}',
                isActive = ${n(isActive)}
            WHERE id = ${id}
        `);
    };
}
