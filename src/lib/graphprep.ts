import * as moment from "moment";
import { Moment } from "moment";
import { GRAPH_DATE_FORMAT } from "../common/date.constants";

import * as Types from "../common/types";

/**
 * Generate an array/series of dates including the
 * start and end (inclusive).
 *
 * @param startDate Moment
 * @param endDate Moment
 */
export const generateDateSeries = (
    startDate: Moment,
    endDate: Moment
): Types.TDateSeries => {
    const datePointer = startDate.clone();
    const dates = [];
    while (!datePointer.isAfter(endDate, "day")) {
        dates.push(datePointer.format(GRAPH_DATE_FORMAT));
        datePointer.add(1, "d");
    }
    return dates;
};

export const buildGraphableDataArray = (
    dateSeries: Types.TDateSeries,
    appLogTypes: Types.TAppLogTypes,
    appLogs: Types.TAppLogs
) => {
    interface ITypesTemp {
        [key: string]: number;
    }

    const types = appLogTypes.toArray();
    const typesInitial: ITypesTemp = {};
    for (let i = 0; i < types.length; i++) {
        // Initialize the count for each type to 0
        typesInitial[types[i]] = 0;
    }

    let dateKeyedTypes: { [key: string]: ITypesTemp } = {};
    dateSeries.map(date => {
        // Build a date keyed object of the types count
        // so far initialized to 0
        dateKeyedTypes[date] = { ...typesInitial };
    });

    appLogs.map((item: Types.ILogItem) => {
        const timeOfLog = moment(item.createdAt).format(GRAPH_DATE_FORMAT);

        // Increment the count for this log type
        dateKeyedTypes[timeOfLog][item.type]++;
    });

    type IGraphableData = ITypesTemp & {
        date: string;
    };
    type IGraphableDataArray = IGraphableData[]; // | undefined[];
    let graphableData: any[] = [];
    dateSeries.map((date: string) => {
        const data = {
            date: date,
            ...dateKeyedTypes[date]
        };
        graphableData.push(data);
    });

    return graphableData;
};
