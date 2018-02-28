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

        if (currentLogType in LOG_TYPES) {
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
    }

    return chartableData;
};

/**
 * Build the data structure for the pie chart.
 *
 * @param appLogTypes List of the log types.
 * @param appLogs OrderedMap of the logs
 */
export const generateLogTypesPieData = (
    appLogTypes: Types.TAppLogTypes,
    appLogs: Types.TAppLogs
) => {
    interface ITypeTotals {
        [key: string]: number;
    }

    const typeTotals: ITypeTotals = {};
    appLogTypes.map(type => {
        typeTotals[type] = 0;
    });

    appLogs.map(item => {
        typeTotals[item.type] = typeTotals[item.type] + 1;
    });

    // Build the final data structure
    let chartableData: Types.TPieChartSlices = [];
    appLogTypes.map(type => {
        if (type in LOG_TYPES) {
            chartableData.push({
                id: LOG_TYPES[type].name,
                label: LOG_TYPES[type].name,
                value: typeTotals[type],
                color: LOG_TYPES[type].color
            });
        }
    });

    return chartableData;
};

/**
 * Generate the data array for the
 * actions pie chart.
 *
 * @param appLogs
 */
export const generateActionsPieData = (appLogs: Types.TAppLogs) => {
    interface IActionTotals {
        [key: string]: number;
    }

    const actionTotals: IActionTotals = {};

    appLogs.map((item: Types.ILogItem) => {
        if (item.type === "action") {
            // The action name is stored in the data (either string or first element in array)
            const actionName =
                typeof item.data === "string"
                    ? item.data
                    : item.data[0].toString();
            if (typeof actionTotals[actionName] === "undefined") {
                actionTotals[actionName] = 0;
            } else {
                actionTotals[actionName] = actionTotals[actionName] + 1;
            }
        }
    });

    let chartableData: Types.TPieChartSlices = [];
    Object.keys(actionTotals).forEach(actionName => {
        chartableData.push({
            id: actionName,
            label: actionName,
            value: actionTotals[actionName]
        });
    });
    return chartableData;
};
