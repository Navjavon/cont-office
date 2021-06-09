import { shortResponse } from '@helpers/shortResponse';
import { validate } from '@helpers/validate';

import {
    INTERNAL_SERVER_ERROR,
    OK
} from '@constants/http-statuses';

import model from './company.model';

export default class CompanyHandler implements Handler {
    public static get = async (req: eRequest, res: eResponse) => {
        const {raws, err, message} = await model.read();
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        res.json(raws);
    };

    public static put = async (req: eRequest, res: eResponse) => {
        const company: ICompany = req.body;
        if (!validate<IDepartment>(res, {name: ''}, company)) {
            return;
        }

        const {err, message} = await model.update(company.name);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Имя компании успешно обновлен');
    };
}
