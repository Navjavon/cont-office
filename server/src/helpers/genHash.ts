import bcrypt from 'bcryptjs';
import { SALT_WORK_FACTOR } from '@constants/index';

export const genHash = async (password: string) => {
    let salt = '';
    let result: IReturn<string> = { data: '' };

    try {
        salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    } catch (e) {
        result.error = true;
        console.error('Error during generating hash', e);

        return result;
    }

    try {
        result.data = await bcrypt.hash(password, salt);
    } catch (e) {
        result.error = true;
        console.error('Error during generating hash', e);
    }

    return result;
};

export const comparePasswords = async (resource: string, test: string) => {
    let result: IReturn<boolean> = { data: false };

    try {
        result.data = await bcrypt.compare(test, resource);
    } catch (e) {
        result.error = true;
        console.error('Error during comparing passwords', e);
    }

    return result;
};
