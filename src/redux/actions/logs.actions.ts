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
        type: ActionTypes.LOGS_START_LOADING
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
        dispatch(overwriteAppLogs(newAppLogs));
        dispatch(sortAppLogs());
    };
};

export const sortAppLogs = () => {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        const { logs, sort } = getState();
        const { appLogs } = logs;
        const { order } = sort;

        const parts = order.split(":");
        const comparator = comparatorDispatch(parts[1]);
        const sortedAppLogs: Types.IAppLogs = appLogs
            .sort((a: any, b: any) => comparator(a, b, parts[0]))
            .toMap();
        dispatch(overwriteAppLogs(sortedAppLogs));
    };
};

const overwriteAppLogs = (appLogs: Types.IAppLogs) => {
    return {
        type: ActionTypes.LOGS_APP_DATA_LOADED,
        appLogs
    };
};
