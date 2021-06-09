import database from '@database';
import { Statement } from 'sqlite';
import { getCurrentTimeStamp } from '@helpers/date';
import { e, isNotZero, makeLimit, makeQuery, n } from '@helpers/sqlite';

class SuggestionModel implements IModel<IResultQuery> {
    select: string = `
        SELECT
            s.id,
            s.description,
            s.groupId,
               g.name as 'group',
            s.authorId,
               a.name,
               a.surname,
               a.patronymic,
               a.gender,
               a.phone,
               a.street,
               a.home,
            u.firstName as creator,
            s.creatorId,
            s.date,
            s.comments
    `;

    from: string = `
        FROM
            suggestions s,
            authors a,
            users u,
            groups g
    `;

    where: string = `
        WHERE
            s.authorId = a.id
        AND
            s.groupId = g.id
        AND
            s.creatorId = u.ID
        AND
            s.isDeleted = 0
    `;

    query: string = '';

    get selectAllQuery() {
        return `
            ${this.select}
            ${this.from}
            ${this.where}
        `;
    }

    create = async (suggestion: ISuggestion): Promise<IResultQuery> => {
        const {
            description,
            group,
            author: {
                name,
                surname,
                street,
                home,
                gender,
                phone
            },
            creator,
            comments
        } = suggestion;

        // TODO move to separate file
        const author: IResultQuery<Statement> = await database.run(`
            INSERT INTO authors
                (name, surname, gender, phone, street, home)
            VALUES
                ('${e(name)}', ${n(surname)}, ${n(gender)}, ${n(phone)}, ${n(street)}, ${n(home)})
        `);

        if (author.err || !author.raws) {
            return author;
        }

        return database.run(`
            INSERT INTO suggestions
                (description, groupId, authorId, creatorId, date, comments)
            VALUES
                ('${e(description)}', ${group.id}, ${author.raws.lastID}, ${creator.id},
                ${getCurrentTimeStamp()}, '${e(comments)}');
        `);
    };

    delete = async (id: number): Promise<IResultQuery> => {
        return database.run(`
            UPDATE suggestions SET
                isDeleted = 1
            WHERE
                id = '${id}'
        `);
    };

    readAll = async (filter: IBaseFilter): Promise<IResultQuery<ISuggestionDB[]>> => {
        const {
            from,
            to,
            groupId,
            text,
            page,
            limit,
            gender
        } = filter;

        let [
            fromDateQ,
            toDateQ,
            groupIdQ,
            textQ,
            limitQ,
            genderQ
        ] = new Array(7).fill('');

        if (isNotZero(from)) {
            fromDateQ = makeQuery('s.date', from, '>=');
        }

        if (isNotZero(to)) {
            toDateQ = makeQuery('s.date', to, '<=');
        }

        if (isNotZero(groupId)) {
            groupIdQ = makeQuery('s.groupId', groupId);
        }

        if (isNotZero(gender)) {
            genderQ = makeQuery('a.gender', gender);
        }

        if (text) {
            textQ = `
                AND (
                    s.description LIKE '%${text}%'
                    OR a.name LIKE '%${text}%'
                    OR a.surname LIKE '%${text}%'
                    OR a.phone LIKE '%${text}%'
                    OR a.street LIKE '%${text}%'
                )
            `;
        }

        limitQ = makeLimit(page, limit);

        this.query = `
            ${fromDateQ}
            ${toDateQ}
            ${groupIdQ}
            ${textQ}
            ${genderQ}
        `;

        return database.all<ISuggestionDB[]>(`
            ${this.selectAllQuery}
            ${this.query}
            ORDER BY creationDate DESC
            ${limitQ}
        `);
    };

    update = async (suggestion: ISuggestion): Promise<IResultQuery> => {
        const {
            id,
            description,
            group,
            author,
            author: {
                name,
                surname,
                street,
                home,
                gender,
                phone
            },
            comments
        } = suggestion;

        const authorRes: IResultQuery<Statement> = await database.run(`
            UPDATE authors SET
                name = '${e(name)}',
                surname = ${n(surname)},
                gender = ${n(gender)},
                phone = ${n(phone)},
                street = ${n(street)},
                home = ${n(home)}
            WHERE id = ${author.id}
        `);

        if (authorRes.err || !authorRes.raws) {
            return authorRes;
        }

        return database.run(`
            UPDATE suggestions SET
                description = '${e(description)}',
                authorId = ${author.id},
                groupId = ${group.id},
                comments = '${e(comments)}'
            WHERE id = ${id};
        `);
    };

    getCountByFilter = async (): Promise<IResultQuery<ICount>> => {
        return database.get<ICount>(`
            SELECT
                COUNT(*) as count
            ${this.from}
            ${this.where}
            ${this.query}
        `);
    };

    getReportByGroups = async (filter: Partial<IFilter>): Promise<IResultQuery<ISuggestionReport[]>> => {
        const {
            from,
            to,
            gender
        } = filter;
        let fromDateQ = '';
        let toDateQ = '';
        let genderQ = '';

        if (isNotZero(from)) {
            fromDateQ = makeQuery('s.date', from, '>=');
        }

        if (isNotZero(to)) {
            toDateQ = makeQuery('s.date', to, '<=');
        }

        if (isNotZero(gender)) {
            genderQ = makeQuery('a.gender', gender);
        }

        return database.all<ISuggestionReport[]>(`
            SELECT
                s.groupId,
                g.name as 'group',
                a.gender,
                COUNT(*) as count
            FROM
                suggestions s,
                authors a,
                groups g
            WHERE
                s.authorId = a.id
            AND
                s.groupId = g.id
            AND
                s.isDeleted = 0
            ${fromDateQ}
            ${toDateQ}
            ${genderQ}
            GROUP BY groupId;
        `);
    };

    getCount = async (): Promise<IResultQuery<ICount>> => {
        return database.get<ICount>(`
            SELECT
                COUNT(*) as count
            FROM
                suggestions
            WHERE ${1}
        `);
    }
}

export default new SuggestionModel();
