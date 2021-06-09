interface IResultQuery<T = any> {
    raws?: T;
    err?: boolean;
    message?: string;
    code?: string;
}
