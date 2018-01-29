export const comparatorDispatch = (order: string) => {
    if (order === "desc") {
        return comparatorDesc;
    } else {
        return comparatorAsc;
    }
};

/**
 * Descending comparator for sort method.
 * @param a
 * @param b
 * @param field
 */
export const comparatorDesc = (a: any, b: any, field: string) => {
    if (a[field] > b[field]) return 1;
    if (a[field] < b[field]) return -1;
    return 0;
};

/**
 * Ascending comparator for sort methods.
 * @param a
 * @param b
 * @param field
 */
export const comparatorAsc = (a: any, b: any, field: string) => {
    if (a[field] < b[field]) return 1;
    if (a[field] > b[field]) return -1;
    return 0;
};
