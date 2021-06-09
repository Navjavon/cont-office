import database from '@database';
import { Statement } from 'sqlite';
import { getCurrentTimeStamp } from '@helpers/date';
import { e, isNotZero, makeLimit, makeQuery, n } from '@helpers/sqlite';

class ComplaintModel implements IModel<IResultQuery> {
    select: string = `
        SELECT
            c.id,
            c.number,
            c.description,
            c.groupId,
               g.name as 'group',
            c.complainerId,
               a.name,
               a.surname,
               a.patronymic,
               a.gender,
               a.phone,
               a.street,
               a.home,
               a.room,
            c.executionId,
               e.resDepartmentId,
               d.name as resDepartment,
               d.chief as resDepartmentChief,
               e.date as executionDate,
               e.canalComments,
               e.otherComments,
            u.firstName as creatorName,
            u.lastName as creatorLastName,
            c.creatorId,
            c.regionId,
               r.name as region,
            c.creationDate,
            c.statusId,
               s.name as status
    `;

    from: string = `
        FROM
            complaints c,
            authors a,
            execution e,
            department d,
            status s,
            regions r,
            users u,
            groups g
    `;

    where: string = `
        WHERE
                c.complainerId = a.id
            AND
                c.groupId = g.id
            AND
                c.executionId = e.id
            AND
                c.creatorId = u.ID
            AND
                c.regionId = r.id
            AND
                c.statusId = s.id
            AND
                e.resDepartmentId = d.id
    `;

    query: string = '';

    get selectAllQuery() {
        return `
            ${this.select}
            ${this.from}
            ${this.where}
            AND
                c.isDeleted = 0
        `;
    }

    create = async (complaint: IComplaint): Promise<IResultQuery> => {
        const {
            number, // tslint:disable-line:variable-name
            description,
            group,
            complainer: {
                name,
                surname,
                street,
                home,
                room,
                gender,
                phone
            },
            creator,
            region,
            execution: {
                resDepartment,
                date,
                canalComments,
                otherComments
            },
            status
        } = complaint;

        const complainer: IResultQuery<Statement> = await database.run(`
            INSERT INTO authors
                (name, surname, gender, phone, street, home, room)
            VALUES
                ('${e(name)}', ${n(surname)}, ${n(gender)}, ${n(phone)}, ${n(street)}, ${n(home)}, ${n(room)})
        `);

        if (complainer.err || !complainer.raws) {
            return complainer;
        }

        const execution: IResultQuery<Statement> = await database.run(`
            INSERT INTO execution
                (resDepartmentId, date, canalComments, otherComments)
            VALUES
                (${resDepartment.id}, ${date}, ${n(canalComments)}, ${n(otherComments)})
        `);

        if (execution.err || !execution.raws) {
            return execution;
        }

        return database.run(`
            INSERT INTO complaints
                (number, description, groupId, complainerId, executionId, creatorId,
                regionId, creationDate, statusId)
            VALUES
                (${number}, '${e(description)}', ${group.id}, ${complainer.raws.lastID}, ${execution.raws.lastID}, ${creator.id},
                ${region.id}, ${getCurrentTimeStamp()}, ${status.id})
        `);
    };

    delete = async (complaint: IComplaintDelete): Promise<IResultQuery> => {
        const {
            id,
            removerId,
            remReasonId,
            remReasonDesc
        } = complaint;

        return database.run(`
            UPDATE complaints SET
                removerId = '${removerId}',
                remReasonId = '${remReasonId}',
                removeDate = ${getCurrentTimeStamp()},
                remReasonDesc = '${remReasonDesc}',
                isDeleted = 1
            WHERE
                id = '${id}'
        `);
    };

    read = async (id: number): Promise<IResultQuery<IComplaintDB>> => {
        return database.get<IComplaintDB>(`
            ${this.selectAllQuery}
            AND
                c.id = ${id}
        `);
    };

    readAll = async (filter: Partial<IFilter>): Promise<IResultQuery<IComplaintDB[]>> => {
        const {
            from,
            to,
            groupId,
            statusId,
            text,
            page,
            limit,
            gender
        } = filter;

        let [
            fromDateQ,
            toDateQ,
            groupIdQ,
            statusIdQ,
            textQ,
            limitQ,
            genderQ,
        ] = new Array(7).fill('');

        if (isNotZero(from)) {
            fromDateQ = makeQuery('c.creationDate', from, '>=');
        }

        if (isNotZero(to)) {
            toDateQ = makeQuery('c.creationDate', to, '<=');
        }

        if (isNotZero(groupId)) {
            groupIdQ = makeQuery('c.groupId', groupId);
        }

        if (isNotZero(statusId)) {
            statusIdQ = makeQuery('c.statusId', statusId);
        }

        if (isNotZero(gender)) {
            genderQ = makeQuery('a.gender', gender);
        }

        if (!!text) {
            textQ = `
                AND (
                    c.description LIKE '%${text}%'
                    OR c.number LIKE '%' + SUBSTR('${text}', 2,3) + '%'
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
            ${statusIdQ}
            ${textQ}
            ${genderQ}
        `;

        return database.all<IComplaintDB[]>(`
            ${this.selectAllQuery}
            ${this.query}
            ORDER BY creationDate DESC
            ${limitQ}
        `);
    };

    getCount = async (): Promise<IResultQuery<ICount>> => {
        return database.get<ICount>(`
            SELECT
                COUNT(*) as count
            ${this.from}
            ${this.where}
            AND
                c.isDeleted = 0
            ${this.query}
        `);
    };

    getDeletedCount = async (): Promise<IResultQuery<ICount>> => {
        return database.get<ICount>(`
            SELECT
                COUNT(*) as count
            FROM complaints
            WHERE
                isDeleted = ${1}
        `);
    };

    getLast = async (): Promise<IResultQuery<Partial<IComplaint>>> => {
        return database.get<Partial<IComplaint>>(`
            SELECT
                number,
                creationDate
            FROM complaints
            WHERE
                id = (SELECT MAX(id) FROM complaints)
            AND ${1}
        `);
    };

    getActiveReportByGroups = async (): Promise<IResultQuery<IComplaintShortReport[]>> => {
        return database.all<IComplaintShortReport[]>(`
            SELECT
                c.groupId,
                g.name as 'group',
                COUNT(*) as count
            FROM
                complaints c,
                groups g
            WHERE
                c.groupId = g.id
            AND
                c.isDeleted = ${0}
            AND
                c.statusId = 1
            GROUP BY groupId
        `);
    };

    getReportByStatusesAndGroups = async (filter: Partial<IFilter>): Promise<IResultQuery<IComplaintFullReport[]>> => {
        const {
            from,
            to,
            gender
        } = filter;
        let fromDateQ = '';
        let toDateQ = '';
        let genderQ = '';

        if (isNotZero(from)) {
            fromDateQ = makeQuery('c.creationDate', from, '>=');
        }

        if (isNotZero(to)) {
            toDateQ = makeQuery('c.creationDate', to, '<=');
        }

        if (isNotZero(gender)) {
            genderQ = makeQuery('a.gender', gender);
        }

        return database.all<IComplaintFullReport[]>(`
            SELECT
                c.groupId,
                g.name as 'group',
                c.statusId,
                a.gender,
                s.name as status,
                COUNT(*) as count
            FROM
                complaints c,
                groups g,
                authors a,
                status s
            WHERE
                c.groupId = g.id
            AND
                c.isDeleted = 0
            AND
                c.statusId = s.id
            AND
                c.complainerId = a.id
            ${fromDateQ}
            ${toDateQ}
            ${genderQ}
            GROUP BY statusId, groupId
      `);
    };

    readDeleted = async (page: number): Promise<IResultQuery<IComplaintDeletedDB[]>> => {
        return database.all<IComplaintDeletedDB[]>(`
            ${this.select},
                u2.firstName as removerName,
                u2.lastName as removerLastName,
                c.removeDate,
                c.remReasonId,
                   g2.name as remReason,
                c.remReasonDesc

            ${this.from},
                 users u2,
                 groups g2

            ${this.where}
            AND
                  c.removerId = u2.ID
            AND
                  c.remReasonId = g2.id
            AND
                  c.isDeleted = ${1}
            ORDER BY creationDate DESC
            ${makeLimit(page)}
        `);
    };

    update = async (complaint: IComplaint): Promise<IResultQuery> => {
        const {
            id,
            number, // tslint:disable-line:variable-name
            description,
            group,
            complainer,
            complainer: {
                name,
                surname,
                street,
                home,
                room,
                gender,
                phone
            },
            region,
            execution,
            execution: {
                resDepartment,
                date,
                canalComments,
                otherComments
            },
            status
        } = complaint;

        const complainerRes: IResultQuery<Statement> = await database.run(`
            UPDATE authors SET
                name = '${e(name)}',
                surname = ${n(surname)},
                gender = ${n(gender)},
                phone = ${n(phone)},
                street = ${n(street)},
                home = ${n(home)},
                room = ${n(room)}
            WHERE id = ${complainer.id}
        `);

        if (complainerRes.err || !complainerRes.raws) {
            return complainerRes;
        }

        const executionRes: IResultQuery<Statement> = await database.run(`
            UPDATE execution SET
                resDepartmentId = ${resDepartment.id},
                date = ${date},
                canalComments = ${n(canalComments)},
                otherComments = ${n(otherComments)}
            WHERE id = ${execution.id}
        `);

        if (executionRes.err || !executionRes.raws) {
            return executionRes;
        }

        return database.run(`
            UPDATE complaints SET
                number = ${number},
                description = '${e(description)}',
                complainerId = ${complainer.id},
                groupId = ${group.id},
                regionId = ${region.id},
                statusId = ${status.id}
            WHERE id = ${id};
        `);
    };
}

export default new ComplaintModel();
