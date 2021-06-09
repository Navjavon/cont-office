import { ParamsDictionary } from 'express-serve-static-core';
import { shortResponse } from '@helpers/shortResponse';

const leftMerge = <T = object>(emptyModel: T, newObject: T) => {
    return (Object.keys(emptyModel) as Array<keyof T>)
        .reduce((acc, key) => {
            if (emptyModel[key] === null || typeof emptyModel[key] !== 'object') {
                acc[key] = newObject ? (newObject[key] || emptyModel[key]) : emptyModel[key];
            } else {
                acc[key] = leftMerge(emptyModel[key], newObject[key]);
            }
            return acc;
        }, {} as T);
};

const flattenObj = (value: any, currentKey?: any) => {
    let result: any = {};

    Object.keys(value).forEach((key) => {
        const tempKey = currentKey ? `${currentKey}.${key}` : key;

        if (value[key] === null || typeof value[key] !== 'object') {
            result[tempKey] = value[key];
        } else {
            result = {
                ...result,
                ...flattenObj(value[key], tempKey)
            };
        }
    });

    return result;
};

const whiteListKeys = ['isActive', 'parent'];

export const validate = <T = any>(res: eResponse, emptyModel: T, object: T): boolean => {
    const combined = leftMerge(emptyModel, object);
    const flattened = flattenObj(combined);
    const errorFields = <ParamsDictionary> {};

    for (let [key, value] of Object.entries(flattened)) {
        if (!value && !whiteListKeys.includes(key)) {
            errorFields[key] = 'Это обязательное поле';
        }
    }

    if (Object.keys(errorFields).length) {
        shortResponse(
            res,
            400,
            'Все необходимые полья не заполнены',
            {
                fields: errorFields
            }
        );

        return false;
    }

    return true;
};
