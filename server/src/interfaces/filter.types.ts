interface IBaseFilter {
    from?: number;
    to?: number;
    groupId?: number;
    text?: string;
    gender?: 1 | 2;
    limit?: number;
    page?: number;
}

interface IFilter extends IBaseFilter {
    statusId?: number;
}

interface ICount {
    count: number;
}
