import { shortResponse } from '@helpers/shortResponse';
import { validate } from '@helpers/validate';
import { comparePasswords, genHash } from '@helpers/genHash';

import {
    BAD_REQUEST,
    INTERNAL_SERVER_ERROR,
    NOT_FOUND,
    OK,
} from '@constants/http-statuses';

import model from './account.model';
import { EUser, EUserLogin } from '@constants/empty-objects';
import {MAX_AGE} from '@constants/index';

export default class AccountHandler implements Handler {
    public static get = async (req: eRequest, res: eResponse) => {
        const {username} = req.session;
        const {data, error} = await AccountHandler.getOneUser(req, res, username);
        if (error) {
            return;
        }

        delete data.password;
        res
            .cookie('is_authorised', '1', {
                maxAge: MAX_AGE,
                httpOnly: false
            }).json(data);
    };

    public static put = async (req: eRequest, res: eResponse) => {
        const {username} = req.session;
        const {error} = await AccountHandler.getOneUser(req, res, username);
        if (error) {
            return;
        }

        await AccountHandler.updateUser(req, res);
    };

    public static updateUser = async (req: eRequest, res: eResponse) => {
        const user: IUser = req.body;
        const {err, message} = await model.update(user);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Пользователь успешно обновлен');
    };

    public static updatePassword = async (req: eRequest, res: eResponse) => {
        const {password, password2}: IAccountUpdatePassword = req.body;
        let error;
        let data;

        const {username} = req.session;
        ({data, error} = await AccountHandler.getOneUser(req, res, username));
        if (error) {
            return;
        }

        ({data, error} = await comparePasswords(data.password, password));
        if (error) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, 'Server error');
        }

        if (!data) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, 'Старый пароль не совпадает!');
        }

        ({error, data} = await genHash(password2));
        if (error) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, 'Ошибка во время генерации хеш парольа');
        }

        const {err, message} = await model.updatePassword(data, username);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Пароль успешно обновлен');
    };

    public static login = async (req: eRequest, res: eResponse) => {
        const user: IUserLogin = req.body;
        if (!validate(res, EUserLogin, user)) {
            return;
        }

        let error;
        let data;
        ({data, error} = await AccountHandler.getOneUser(req, res, user.username));
        if (error) {
            return;
        }

        const {data: result, error: err} = await comparePasswords(data.password, user.password);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, 'Server error');
        }

        if (!result) {
            return shortResponse(res, BAD_REQUEST, 'Логин или пароль не правильный');
        }

        req.session.username = data.username;
        req.session.userId = data.id;
        res.status(OK).json({}); // TODO-add-json
    };

    public static logout = (req: eRequest, res: eResponse) => {
        if (req.session) {
            req.session.destroy((err: any) => console.error(err));
            res.clearCookie('is_authorised');
            shortResponse(res, OK, 'log out successfully');
        }
    };

    public static getOneUser = async (req: eRequest, res: eResponse, username: string): Promise<IReturnUser> => {
        const {raws, err, message} = await model.read(username);
        let result: IReturnUser = { data: raws || EUser };

        if (err) {
            shortResponse(res, INTERNAL_SERVER_ERROR, message);
            result.error = true;

            return result;
        }

        if (!raws || !Object.keys(raws || {}).length) {
            shortResponse(res, NOT_FOUND, `Пользователь с username ${username} не найден`);
            result.error = true;
        }

        return result;
    };
}
