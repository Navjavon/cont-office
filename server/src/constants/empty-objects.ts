// Empty User

export const EUser = <IUser> {
    username: '',
    firstName: '',
    position: '',
    password: ''
};

export const EUserLogin = {
    username: '',
    password: ''
};

export const EUserCreation = Object.assign(EUser, { password2: '' });
