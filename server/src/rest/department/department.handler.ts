import { shortResponse } from '@helpers/shortResponse';
import { validate } from '@helpers/validate';
import { checkIdParams } from '@helpers/checkIdParams';

import {
    INTERNAL_SERVER_ERROR,
    CREATED,
    OK
} from '@constants/http-statuses';
import model from './department.model';

// TODO separate in another file
const EDepartment: IDepartment = {
    name: ''
};

export default class DepartmentHandler implements Handler {
    public static create = async (req: eRequest, res: eResponse) => {
        const department: IDepartment = req.body;
        if (!validate<IDepartment>(res, EDepartment, department)) {
            return;
        }

        const {err, message} = await model.create(department);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, CREATED, 'Новая Отдел успешно создана');
    };

    public static getAll = async (req: eRequest, res: eResponse) => {
        const {raws, err, message} = await model.readAll();
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        raws?.forEach((department, _, array) => {
            const parentId = department.parent;
            const parent = array.find((g) => g.id === parentId);
            department.name = `${parent ? parent.name + ' → ' : ''}${department.name}`;
        });

        res.json(raws);
    };

    public static put = async (req: eRequest, res: eResponse) => {
        if (!checkIdParams(req, res)) {
            return;
        }

        const {id} = req.params;
        const department: IDepartment = req.body;
        department.id = +id;

        if (!validate<IDepartment>(res, EDepartment, department)) {
            return;
        }

        const {err, message} = await model.update(department);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Отдел успешно обновлен');
    };

    public static delete = async (req: eRequest, res: eResponse) => {
        if (!checkIdParams(req, res)) {
            return;
        }

        const {id} = req.params;
        const {err, message} = await model.delete(+id);

        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Отдел успешно удален');
    };
}
