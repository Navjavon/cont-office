import { DEFAULT_ELEMENTS_PER_PAGE, DEFAULT_PAGE } from '@constants/index';

/**
 * escaping strings for properly saving in DB
 * @param str
 */
export const e = (str: string|undefined) => (
    str ? str.replace(/[\\$'"]/g, '$&$&') : ''
);

// Make insert param for sqlite query
export const n = (data: any) => {
    if (typeof data === 'string') {
        return `'${e(data)}'`
    }

    return data ?? null;
};

export const makeQuery = (field: string, value: any, type?: string): string => {
    let val = value;
    if (type && type === 'LIKE') {
        val = `%${value}%`;
    }

    return ` AND ${field} ${type ? type : '='} ${n(val)}`
};

export const makeLimit = (page: number = DEFAULT_PAGE, limit: number = DEFAULT_ELEMENTS_PER_PAGE) => {
    const start = (page - 1) * limit;
    const end = page * limit;

    return ` LIMIT ${start},${end}`;
};

export const isNotZero = (data: string | number | undefined): boolean => {
    return !!(data && +data);
};
