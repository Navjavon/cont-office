declare interface IModel<ReturnType> {
    /**
     * Create method of model
     * @param args - can have any number of arguments
     * @description it can be used with async/await or simple Promise
     */
    create?(...args: any[]): Promise<ReturnType>;

    /**
     * Read a row from specific table
     * @param args - can have any number of arguments
     * @description it can be used with async/await or simple Promise
     */
    read?(...args: any[]): Promise<ReturnType>;

    /**
     * Read all rows from specific table
     * @param args - can have any number of arguments
     * @description it can be used with async/await or simple Promise
     */
    readAll?(...args: any[]): Promise<ReturnType>;

    /**
     * Update a row from specific table
     * @param args - can have any number of arguments
     * @description it can be used with async/await or simple Promise
     */
    update?(...args: any[]): Promise<ReturnType>;

    /**
     * Delete a row from specific table
     * @param args - can have any number of arguments
     * @description it can be used with async/await or simple Promise
     */
    delete?(...args: any[]): Promise<ReturnType>;
}

declare abstract class Model {
    public static create<T = any>(...args: any[]): Promise<T>;

    public static read?<T = any>(...args: any[]): Promise<T>;

    public static readAll?<T = any>(...args: any[]): Promise<T>;

    public static update<T = any>(...args: any[]): Promise<T>;

    public static delete?<T = any>(...args: any[]): Promise<T>;
}
