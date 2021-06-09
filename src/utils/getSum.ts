export default (objectArray: Array<Required<ICount>>) => {
    return objectArray
        .reduce((sum, {count}) => {
            sum += count;
            return sum;
        }, 0);
}
