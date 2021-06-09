export const getTimeStamp = (time: string, isLast?: true): number => {
    if (!time) {
        return 0;
    }

    const date = new Date(time);
    if (isLast) {
        date.setHours(23, 59, 59, 999);
    }
    return +date;
};
