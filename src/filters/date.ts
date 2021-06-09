/**
 * @param value - date
 * @param s - separator, default /
 */
export default (value: number, s: string = '/') => {
    const date = new Date(value);

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${checkIfLessThanTen(day)}${s}${checkIfLessThanTen(month)}${s}${year}`;
}

const checkIfLessThanTen = (data: number) => {
    if (data < 10) {
        return `0${data}`;
    }

    return data;
};
