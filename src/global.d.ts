declare const __IS_PRODUCTION__: string;
type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;
