import { shortResponse } from '@helpers/shortResponse';
import { validate } from '@helpers/validate';
import { checkIdParams } from '@helpers/checkIdParams';

import {
    INTERNAL_SERVER_ERROR,
    CREATED,
    OK
} from '@constants/http-statuses';
import model from './region.model';

const ERegion: IRegion = {
    name: ''
};

export default class RegionHandler implements Handler {
    public static create = async (req: eRequest, res: eResponse) => {
        const region: IRegion = req.body;
        if (!validate<IRegion>(res, ERegion, region)) {
            return;
        }

        const {err, message} = await model.create(region);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, CREATED, 'Новый регион успешно создан');
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
        const region: IRegion = req.body;
        region.id = +id;

        if (!validate<IRegion>(res, ERegion, region)) {
            return;
        }

        const {err, message} = await model.update(region);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Регион успешно обновлен');
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

        shortResponse(res, OK, 'Регион успешно удален');
    };
}
