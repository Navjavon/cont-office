import database from '@database';
import {n} from '@helpers/sqlite';

export default class CompanyModel implements Model {
    public static read = async (): Promise<IResultQuery<ICompany>> => {
        return database.get<ICompany>(`
            SELECT
                name
            FROM
                company
            WHERE ${1}
        `);
    };

    public static update = async (name: string | undefined): Promise<IResultQuery> => {
        return database.run(`
            UPDATE company SET
                name = ${n(name)}
            WHERE id = 1
        `);
    };
}
