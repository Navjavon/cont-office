export const USERS = '/users';
export const GROUPS = '/groups';
export const STATUS = '/status';
export const DEPARTMENTS = '/departments';
export const REGIONS = '/regions';
export const LOGIN = '/login';
export const LOGOUT = '/logout';
export const BASE_URL = __IS_PRODUCTION__ ? 'http://5.53.124.53:4000/api' : 'http://localhost:3000/api';
export const COMPLAINTS = '/complaints';
export const SUGGESTION = '/suggestions';

export enum GROUP_TYPES {
    COMPLAINT = '1',
    SUGGESTION = '2',
    REMOVE_REASON = '3',
}
