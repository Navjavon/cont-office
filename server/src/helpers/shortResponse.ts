export const shortResponse = (res: eResponse, status: number, message: string = 'Server error', otherArgs: {} = {}) => {
    res
        .status(status)
        .json({
            message,
            ...otherArgs
        });
};
