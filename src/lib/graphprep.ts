import * as moment from "moment";
import { Moment } from "moment";
import { GRAPH_DATE_FORMAT } from "../common/date.constants";

import * as Types from "../common/types";
import { LOG_TYPES } from "../common/logtypes.constants";

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

export const buildChartableDataArray = (
    dateSeries: Types.TDateSeries,
    appLogTypes: Types.TAppLogTypes,
    appLogs: Types.TAppLogs
) => {
    interface ITypesTemp {
        [key: string]: number;
    }

    const types = appLogTypes.toArray();
    let typesInitial: ITypesTemp = {};
    for (let i = 0; i < types.length; i++) {
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

        if (dateKeyedTypes[timeOfLog] !== undefined) {
            // Increment the count for this log type
            dateKeyedTypes[timeOfLog][item.type]++;
        }
    });

    let chartableData: any[] = [];
    for (let i = 0; i < types.length; i++) {
        const data: any[] = [];
        const currentLogType = types[i];
        dateSeries.map((date, index) => {
            data.push({
                x: date,
                y: dateKeyedTypes[date][currentLogType]
            });
        });

        // Initialize the count for each type to 0
        chartableData.push({
            id: types[i],
            color: LOG_TYPES[currentLogType].color,
            data
        });
    }

    return chartableData;
};
