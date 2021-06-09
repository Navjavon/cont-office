import { shortResponse } from '@helpers/shortResponse';
import { validate } from '@helpers/validate';
import { checkIdParams } from '@helpers/checkIdParams';

import {
    INTERNAL_SERVER_ERROR,
    CREATED,
    OK,
    NOT_FOUND
} from '@constants/http-statuses';
import {
    EComplaint,
    EComplaintDelete,
    EComplaintUpdate
} from '@constants/e-complaints';
import { DEFAULT_ELEMENTS_PER_PAGE } from '@constants/index';

import model from './complaint.model';

class ComplaintHandler implements IHandler {
    create = async (req: eRequest, res: eResponse) => {
        const complaint: IComplaint = req.body;
        if (!complaint.creator) {
            complaint.creator = {};
        }
        complaint.creator.id = req.session.userId;
        if (!validate<IComplaint>(res, EComplaint, complaint)) {
            return;
        }

        const {err, message} = await model.create(complaint);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, CREATED, 'Новая жалоба успешно создан');
    };

    get = async (req: eRequest, res: eResponse) => {
        if (!checkIdParams(req, res)) {
            return;
        }

        const {id} = req.params;
        const {raws, err, message} = await model.read(id);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        if (!raws || !Object.keys(raws || {}).length) {
            return shortResponse(res, NOT_FOUND, `Жалоба с id ${id} не найден`);
        }

        const complaint: IComplaint = (this.makeComplaintFromDbResponse(raws) as IComplaint);

        res.json(complaint);
    };

    getAll = async (req: eRequest, res: eResponse) => {
        const filter: IFilter = req.query;
        const {raws, err, message} = await model.readAll(filter);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        const complaints: IComplaint[] = [];

        raws?.forEach((complaintDB: IComplaintDB) => {
            const complaint = (this.makeComplaintFromDbResponse(complaintDB) as IComplaint);
            complaints.push(complaint);
        });

        const countResult = await model.getCount();
        if (countResult.err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, countResult.message);
        }

        let count = countResult.raws?.count;
        let pages = 0;
        if (count) {
            pages = Math.ceil(count / DEFAULT_ELEMENTS_PER_PAGE);
        }

        res.json({ complaints, pages });
    };

    getAllDeleted = async (req: eRequest, res: eResponse) => {
        const {page} = req.params;
        const {raws, err, message} = await model.readDeleted(page);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        const complaints: IComplaintDeleted[] = [];

        raws?.forEach((complaintDB: IComplaintDeletedDB) => {
            const complaint = (this.makeComplaintFromDbResponse(complaintDB) as IComplaintDeleted);
            complaints.push(complaint);
        });

        const countResult = await model.getDeletedCount();
        if (countResult.err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, countResult.message);
        }

        let count = countResult.raws?.count;
        let pages = 0;
        if (count) {
            pages = Math.ceil(count / DEFAULT_ELEMENTS_PER_PAGE);
        }

        res.json({ complaints, pages });
    };

    getFullReport = async (req: eRequest, res: eResponse) => {
        const filter: IFilter = req.query;
        const {raws, err, message} = await model.getReportByStatusesAndGroups(filter);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        res.json(raws);
    };

    getShortReport = async (req: eRequest, res: eResponse) => {
        const {raws, err, message} = await model.getActiveReportByGroups();
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        res.json(raws);
    };

    getNewNumber = async (req: eRequest, res: eResponse) => {
        const {raws: complaint, err, message} = await model.getLast();
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        let newNumber = 1;
        if (!complaint) {
            res.json({newNumber});
            return;
        }

        const {number: lastNumber, creationDate} = complaint;
        const lastRawYear = (new Date(creationDate || 0)).getFullYear();
        const thisYear = new Date().getFullYear();
        if (thisYear === lastRawYear && lastNumber) {
            newNumber = lastNumber + 1;
        }

        res.json({newNumber});
    };

    put = async (req: eRequest, res: eResponse) => {
        if (!checkIdParams(req, res)) {
            return;
        }

        const {id} = req.params;
        const complaint: IComplaint = req.body;
        complaint.id = +id;

        if (!validate<IComplaint>(res, EComplaintUpdate, complaint)) {
            return;
        }

        const {err, message} = await model.update(complaint);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Жалоба успешно обновлен');
    };

    delete = async (req: eRequest, res: eResponse) => {
        if (!checkIdParams(req, res)) {
            return;
        }

        const {id} = req.params;
        const complaint: IComplaintDelete = req.body;
        complaint.id = +id;
        complaint.removerId = req.session.userId;

        if (!validate<IComplaintDelete>(res, EComplaintDelete, complaint)) {
            return;
        }

        const {err, message} = await model.delete(complaint);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Жалоба успешно удален');
    };

    private makeComplaintFromDbResponse = (complaintDB: Partial<IComplaintDeletedDB>): Partial<IComplaintDeleted> => {
        const {
            id,
            number, // tslint:disable-line:variable-name
            description,
            creationDate,
            complainerId,
            name,
            surname,
            gender,
            phone,
            street,
            home,
            room,
            executionId,
            executionDate,
            resDepartment,
            resDepartmentChief,
            resDepartmentId,
            canalComments,
            otherComments,
            group,
            groupId,
            creatorName,
            creatorLastName,
            creatorId,
            region,
            regionId,
            status,
            statusId,
            removerName
        } = complaintDB;

        const complaint: Partial<IComplaintDeleted> = {
            id,
            number,
            description,
            group: {
                id: groupId,
                name: group
            },
            complainer: {
                id: complainerId,
                name,
                surname,
                gender,
                phone,
                street,
                home,
                room
            },
            // @ts-ignore
            execution: {
                id: executionId,
                date: executionDate,
                resDepartment: {
                    id: resDepartmentId,
                    name: resDepartment,
                    chief: resDepartmentChief
                },
                canalComments,
                otherComments
            },
            creator: {
                id: creatorId,
                name: creatorName,
                surname: creatorLastName
            },
            region: {
                id: regionId,
                name: region
            },
            creationDate,
            status: {
                id: statusId,
                name: status
            }
        };

        if (removerName) {
            const {
                remReason,
                remReasonId,
                remReasonDesc,
                removeDate,
                removerLastName
            } = complaintDB;

            complaint.remover = {
                name: removerName,
                surname: removerLastName
            };
            complaint.remReason = {
                id: remReasonId,
                name: remReason
            };
            complaint.remReasonDesc = remReasonDesc;
            complaint.removeDate = removeDate;
        }

        return complaint;
    };
}

export default new ComplaintHandler();
