interface IReturn<T> {
    error?: boolean;
    data: T;
}

interface IIdName {
    id?: number;
    name?: string;
}

interface IIsActive {
    isActive?: boolean;
}
