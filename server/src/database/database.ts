import sqlite, { Database as IDatabase, Statement} from 'sqlite';

class Database {
    // @ts-ignore
    private db: IDatabase;
    constructor() {
        this.connect();
    }

    public all = <T>(sql: string) => this.query<T>(sql, 'all');

    public get = <T>(sql: string) => this.query<T>(sql, 'get');

    public run = (sql: string) => this.query(sql, 'run');

    private connect = async () => {
        try {
            this.db = await sqlite.open('./database.sqlite');
            console.log('Connected to Database successfully');
        } catch (e) {
            console.error(e);
            throw Error('DataBase connection error: ');
        }
    };

    private query = async <T = any>(sql: string, type: string) => {
        if (!this.db) {
            await this.connect();
        }

        let result: IResultQuery = {};

        try {
            switch (type) {
                case 'all': {
                    result = <IResultQuery<T[]>> {};
                    result.raws = await this.db.all<T>(sql);

                    break;
                }

                case 'get': {
                    result = <IResultQuery<T>> {};
                    result.raws = await this.db.get<T>(sql);

                    break;
                }

                case 'run': {
                    result = <IResultQuery<Statement>> {};
                    result.raws = await this.db.run(sql);

                    break;
                }
            }
        } catch (e) {
            result = <IResultQuery<null>> {};
            result.err = true;

            result.code = e.errno;
            result.message = e.message;
        }

        return result;
    };
}

export default new Database();
