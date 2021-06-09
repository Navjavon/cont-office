export default (author: IAuthor, shorten: boolean): string => {
    const {
        name,
        surname,
        patronymic
    } = author;

    const surnameStr = getStr(surname);
    const patronymicStr = getStr(patronymic);

    return shorten ?
        `${surnameStr}${surnameStr ? shortenName(name) : name}${shortenName(patronymicStr)}` :
        `${surnameStr}${name}${patronymicStr}`;
}

export const getStr = (name: string): string => name ? `${name} ` : '';
const shortenName = (name: string): string => name ? `${name[0]}.` : '';
