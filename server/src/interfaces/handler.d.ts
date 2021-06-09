// @ts-ignore
type eResponse = e.Response;
// @ts-ignore
type eRequest<T = undefined> = e.Request<T>;

interface IHandler {
    /**
     * create a new model - handler in REST API
     * @param req - request of Client (Express request)
     * @param res - response (Express response)
     */
    create(req: eRequest, res: eResponse): void;

    /**
     * get one element from model (or get) and response to client - handler in REST API
     * @param req - request of Client (Express request)
     * @param res - response (Express response)
     */
    get?(req: eRequest, res: eResponse): void;

    /**
     * read all raws from model(or get all) - handler in REST API
     * @param req - request of Client (Express request)
     * @param res - response (Express response)
     */
    getAll?(req: eRequest, res: eResponse): void;

    /**
     * update one raw - handler in REST API
     * @param req - request of Client (Express request)
     * @param res - response (Express response)
     */
    put(req: eRequest, res: eResponse): void;

    /**
     * delete one raw (or mark is as Deleted) - handler in REST API
     * @param req - request of Client (Express request)
     * @param res - response (Express response)
     */
    delete?(req: eRequest, res: eResponse): void;
}

declare abstract class Handler {
    public static create(req: eRequest, res: eResponse): void;

    public static get?(req: eRequest, res: eResponse): void;

    public static getAll?(req: eRequest, res: eResponse): void;

    public static put(req: eRequest, res: eResponse): void;

    public static delete?(req: eRequest, res: eResponse): void;
}
