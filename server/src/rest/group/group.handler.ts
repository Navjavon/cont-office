import { shortResponse } from '@helpers/shortResponse';
import { validate } from '@helpers/validate';
import { checkIdParams } from '@helpers/checkIdParams';

import {
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    CREATED,
    OK,
} from '@constants/http-statuses';
import model from './group.model';

// TODO separate in another file
const EGroup: IGroup = {
    name: '',
    type: 0
};

export default class GroupHandler implements Handler {
    public static create = async (req: eRequest, res: eResponse) => {
        const group: IGroup = req.body;
        if (!validate<IGroup>(res, EGroup, group)) {
            return;
        }

        const {err, message} = await model.create(group);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, CREATED, 'Новая группа успешно создана');
    };

    // TODO add count
    public static getAll = async (req: eRequest, res: eResponse) => {
        const {type}  = req.params;
        const idNumber = Number.parseInt(type, 10);
        if (type && !idNumber) {
            return shortResponse(res, BAD_REQUEST, 'Параметр type не правильно указан');
        }

        const {raws, err, message} = await model.readAll(type);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        raws?.forEach((group, _, array) => {
            const parentId = group.parent;
            const parent = array.find((g) => g.id === parentId);
            group.name = `${parent ? parent.name + ' → ' : ''}${group.name}`;
        });

        res.json(raws);
    };

    public static put = async (req: eRequest, res: eResponse) => {
        if (!checkIdParams(req, res)) {
            return;
        }

        const {id} = req.params;
        const group: IGroup = req.body;
        group.id = +id;

        if (!validate<IGroup>(res, EGroup, group)) {
            return;
        }

        const {err, message} = await model.update(group);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Группа успешно обновлен');
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

        shortResponse(res, OK, 'Группа успешно удален');
    };
}
