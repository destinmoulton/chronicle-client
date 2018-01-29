import { Moment } from "moment";
interface IQueryParams {
    app: string;
    type?: string;
    dateRangeEnd: Moment;
    dateRangeStart: Moment;
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
                {
                    name: "createdAt",
                    attributeAlias: "startTime",
                    value: queryParams.dateRangeStart.valueOf(),
                    comparison: ">="
                },
                {
                    name: "createdAt",
                    attributeAlias: "endTime",
                    value: queryParams.dateRangeEnd.valueOf(),
                    comparison: "<="
                },
                typeQuery
            ]
        }
    };

    return JSON.stringify(query);
};
