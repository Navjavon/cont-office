interface IUser extends IStatus {
    id?: number;
    username: string;
    firstName: string;
    lastName?: string;
    position: string;
    password: string;
    type: number;
    isDeleted?: boolean;
}

type IUserLogin = Pick<IUser, 'username' | 'password'>

interface IUserCreation extends Omit<IUser, 'id'> {
    password2: string;
}

type IReturnUser = IReturn<IUser>;
