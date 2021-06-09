import { shortResponse } from '@helpers/shortResponse';
import { validate } from '@helpers/validate';
import { checkIdParams } from '@helpers/checkIdParams';

import {
    INTERNAL_SERVER_ERROR,
    CREATED,
    OK
} from '@constants/http-statuses';
import model from './status.model';

// TODO in another file
const EStatus: IStatus = {
    name: ''
};

export default class StatusHandler implements Handler {
    public static create = async (req: eRequest, res: eResponse) => {
        const status: IStatus = req.body;
        if (!validate<IStatus>(res, EStatus, status)) {
            return;
        }

        const {err, message} = await model.create(status);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, CREATED, 'Новый статус успешно создан');
    };

    public static getAll = async (req: eRequest, res: eResponse) => {
        const {raws, err, message} = await model.readAll();
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        res.json(raws);
    };

    public static put = async (req: eRequest, res: eResponse) => {
        if (!checkIdParams(req, res)) {
            return;
        }

        const {id} = req.params;
        const status: IStatus = req.body;
        status.id = +id;

        if (!validate<IStatus>(res, EStatus, status)) {
            return;
        }

        const {err, message} = await model.update(status);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Статус успешно обновлен');
    };

    // TODO add trigger
    public static delete = async (req: eRequest, res: eResponse) => {
        if (!checkIdParams(req, res)) {
            return;
        }

        const {id} = req.params;
        const {err, message} = await model.delete(+id);

        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Статус успешно удален');
    };
}
