export default (cNumber: number): string => {
    const thisYear = new Date().getFullYear();
    let result = cNumber?.toString() || '';
    const length = result?.length;
    let count = 4 - length;

    while (count) {
        count--;
        result = `0${result}`;
    }

    return `${result}/${thisYear}`;
}
