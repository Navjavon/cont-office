import {shortResponse} from '@helpers/shortResponse';
import {BAD_REQUEST} from '@constants/http-statuses';

export const checkIdParams = (req: eRequest, res: eResponse): boolean => {
    const {id} = req.params;
    const idNumber = Number.parseInt(id, 10);
    if (!idNumber) {
        shortResponse(res, BAD_REQUEST, 'Параметр id не указан или не правильно указан');
        return false;
    }

    return true;
};
