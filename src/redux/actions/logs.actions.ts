import { OrderedMap } from "immutable";

import { API_URL } from "../../../chronicle.config";
import * as ActionTypes from "../actionTypes";
import * as Types from "../../common/types";
import { JSON_HEADERS } from "../../common/headers";

import { comparatorDispatch } from "../../lib/comparators";
import { chronicleAPIQueryBuilder } from "../../lib/chronicleAPIQueryBuilder";

export const loadLogs = () => {
    return (dispatch: Types.IDispatch) => {
        dispatch(setLoadingState());
        dispatch(getServerLogs());
    };
};

const setLoadingState = () => {
    return {
        type: ActionTypes.LOGS_API_CALL_BEGIN
    };
};

const getServerLogs = () => {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { dateRangeEnd, dateRangeStart } = getState().query;
        const fetchParams = {
            method: "POST",
            headers: JSON_HEADERS,
            body: chronicleAPIQueryBuilder({
                app: "Nic Cage App",
                //type: "log",
                dateRangeEnd,
                dateRangeStart
            })
        };
        fetch(API_URL + "/query", fetchParams)
            .then(res => {
                return res.json();
            })
            .then(parsed => {
                if (
                    parsed.data !== undefined &&
                    parsed.data.Items !== undefined
                ) {
                    dispatch(apiCallComplete());
                    dispatch(prepareAppLogs(parsed.data.Items));
                } else {
                    console.error(
                        "logs.actions :: getServerLogs() :: No Items in data.",
                        parsed
                    );
                }
            });
    };
};

const apiCallComplete = () => {
    return {
        type: ActionTypes.LOGS_API_CALL_COMPLETE
    };
};

const prepareAppLogs = (logItems: any) => {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        // Build a map of the Items
        let mappedItems: Types.IAppLogs = OrderedMap();
        logItems.forEach((item: any) => {
            mappedItems = mappedItems.set(item.id, item);
        });

        //Merge with current data
        //const appLogs = getState().logs.appLogs;
        const newAppLogs = mappedItems; //appLogs.merge(mappedItems);
        dispatch(writeAppLogs(newAppLogs));
        dispatch(sortAppLogs());
    };
};

export const sortAppLogs = () => {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { logs, sort } = getState();
        const { appLogs } = logs;
        const { order } = sort;

        const [sortField, sortOrder] = order.split(":");
        const comparator = comparatorDispatch(sortOrder);
        const sortedAppLogs: Types.IAppLogs = appLogs
            .sort((a: any, b: any) => comparator(a[sortField], b[sortField]))
            .toOrderedMap();
        dispatch(writeAppLogs(sortedAppLogs));
    };
};

const writeAppLogs = (data: Types.IAppLogs) => {
    return {
        type: ActionTypes.LOGS_WRITE_DATA,
        data
    };
};
