interface IQueryParams {
    app: string;
    type?: string;
}

/**
 * Build a query for the Chronicle API
 * @param queryParams
 */
export const chronicleAPIQueryBuilder = (queryParams: IQueryParams) => {
    let typeQuery = null;

    if (queryParams.type) {
        typeQuery = {
            name: "type",
            value: queryParams.type,
            comparison: "=",
            bool: "AND"
        };
    }

    const query = {
        query: {
            parts: [
                {
                    name: "app",
                    value: queryParams.app,
                    comparison: "="
                },
                typeQuery
            ]
        }
    };

    return JSON.stringify(query);
};
