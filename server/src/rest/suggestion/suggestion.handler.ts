import { shortResponse } from '@helpers/shortResponse';
import { validate } from '@helpers/validate';
import { checkIdParams } from '@helpers/checkIdParams';

import {
    OK,
    CREATED,
    INTERNAL_SERVER_ERROR
} from '@constants/http-statuses';
import { ESuggestion } from '@constants/e-suggestion';
import { DEFAULT_ELEMENTS_PER_PAGE } from '@constants/index';

import model from './suggestion.model';

class SuggestionHandler implements IHandler {
    create = async (req: eRequest, res: eResponse) => {
        const suggestion: ISuggestion = req.body;
        suggestion.creator.id = req.session.userId;
        if (!validate<ISuggestion>(res, ESuggestion, suggestion)) {
            return;
        }

        const {err, message} = await model.create(suggestion);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, CREATED, 'Новое предложение успешно создан');
    };

    getAll = async (req: eRequest, res: eResponse) => {
        const filter: IBaseFilter = req.query;
        const {raws, err, message} = await model.readAll(filter);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        const suggestions: ISuggestion[] = [];

        raws?.forEach((suggestionDb: ISuggestionDB) => {
            const {
                id,
                description,
                authorId,
                name,
                surname,
                gender,
                phone,
                street,
                home,
                group,
                groupId,
                creatorName,
                creatorId,
                date,
                comments
            } = suggestionDb;

            const suggestion: ISuggestion = {
                id,
                description,
                group: {
                    id: groupId,
                    name: group
                },
                author: {
                    id: authorId,
                    name,
                    surname,
                    gender,
                    phone,
                    street,
                    home
                },
                creator: {
                    id: creatorId,
                    name: creatorName
                },
                date,
                comments
            };

            suggestions.push(suggestion);
        });

        const countResult = await model.getCountByFilter();
        if (countResult.err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, countResult.message);
        }

        let count = countResult.raws?.count;
        let pages = 0;
        if (count) {
            pages = Math.ceil(count / DEFAULT_ELEMENTS_PER_PAGE);
        }

        res.json({ suggestions, pages });
    };

    getFullReport = async (req: eRequest, res: eResponse) => {
        const filter: IFilter = req.query;
        const {raws, err, message} = await model.getReportByGroups(filter);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        res.json(raws);
    };

    getShortReport = async (req: eRequest, res: eResponse) => {
        const countResult = await model.getCount();
        if (countResult.err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, countResult.message);
        }

        let count = countResult.raws?.count;
        res.json({count});
    };

    put = async (req: eRequest, res: eResponse) => {
        if (!checkIdParams(req, res)) {
            return;
        }

        const {id} = req.params;
        const suggestion: ISuggestion = req.body;
        suggestion.id = +id;

        if (!validate<ISuggestion>(res, ESuggestion, suggestion)) {
            return;
        }

        const {err, message} = await model.update(suggestion);
        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Предложение успешно обновлен');
    };

    delete = async (req: eRequest, res: eResponse) => {
        if (!checkIdParams(req, res)) {
            return;
        }

        const {id} = req.params;
        const {err, message} = await model.delete(+id);

        if (err) {
            return shortResponse(res, INTERNAL_SERVER_ERROR, message);
        }

        shortResponse(res, OK, 'Предложение успешно удален');
    };
}

export default new SuggestionHandler();
