import { genHash } from '@helpers/genHash';
import { shortResponse } from '@helpers/shortResponse';
import { validate } from '@helpers/validate';

import { EUserCreation } from '@constants/empty-objects';
import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    CREATED,
    OK
} from '@constants/http-statuses';

import model from './user.model';
import AccountModel from '@/account/account.model';
import AccountHandler from '@/account/account.handler';
import {ERRORS} from '@constants/strings';

export class UserHandler implements IHandler {
    create = async (req: eRequest, res: eResponse) => {
        const user: IUserCreation = req.body;
        if (!validate(res, EUserCreation, user)) {
            return;
        }

        const {
            password,
            password2
        } = user;

        if (password !== password2) {
            return shortResponse(res, BAD_REQUEST, ERRORS.passwordsNotMatch);
        }

        const {error, data} = await genHash(password);
        if (error) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, ERRORS.genPassword);
        }

        user.password = data;
        const {err, message} = await model.create(user);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, CREATED, 'Новый пользователь успешно создан');
    };

    getAll = async (req: eRequest, res: eResponse) => {
        const {raws, err, message} = await model.readAll();
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        res.json(raws);
    };

    delete = async (req: eRequest, res: eResponse) => {
        if (!this.checkUsernameParams(req, res)) {
            return;
        }

        const {username} = req.params;
        const {error} = await AccountHandler.getOneUser(req, res, username);
        if (error) {
            return;
        }

        const {err, message} = await model.delete(username);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Пользователь успешно удален');
    };

    put = async (req: eRequest, res: eResponse) => {
        if (!this.checkUsernameParams(req, res)) {
            return;
        }

        let error;
        let data;
        const {username} = req.params;
        ({error} = await AccountHandler.getOneUser(req, res, username));
        if (error) {
            return;
        }

        const {password}: IUser = req.body;
        if (password) {
            ({error, data} = await genHash(password));
            if (error) {
                return shortResponse(res, INTERNAL_SERVER_ERROR, ERRORS.genPassword);
            }

            const {err, message} = await AccountModel.updatePassword(data, username);
            if (err) {
                return shortResponse(res, INTERNAL_SERVER_ERROR, message);
            }
        }

        await AccountHandler.updateUser(req, res);
    };

    private checkUsernameParams = (req: eRequest, res: eResponse): boolean => {
        const {username} = req.params;
        if (!username) {
            shortResponse(res, BAD_REQUEST, 'Параметр username не указан');
            return false;
        }

        return true;
    };
}

export default new UserHandler();
