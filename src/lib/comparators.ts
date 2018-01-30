/**
 * Return the comparator that should be run.
 *
 * @param order string
 */
export const comparatorDispatch = (order: string) => {
    if (order === "desc") {
        return comparatorDesc;
    } else if (order === "asc") {
        return comparatorAsc;
    } else {
        console.error(
            "comparators.js :: comparatorDispatch() :: Invalid comparator selected.",
            order
        );
    }
};

/**
 * Descending comparator for sort method.
 * @param a
 * @param b
 * @param field
 */
export const comparatorDesc = (a: any, b: any) => {
    if (a > b) return -1;
    if (a < b) return 1;
    return 0;
};

/**
 * Ascending comparator for sort methods.
 * @param a
 * @param b
 * @param field
 */
export const comparatorAsc = (a: any, b: any) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
};
