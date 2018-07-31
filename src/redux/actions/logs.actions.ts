import { List, OrderedMap } from "immutable";
import * as _ from "lodash";

import { API_URL } from "../../../chronicle.config";
import * as ActionTypes from "../actionTypes";
import * as Types from "../../common/types";
import { JSON_HEADERS } from "../../common/headers";

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
        const { dateRangeEnd, dateRangeStart, selectedApp } = getState().query;

        if (!selectedApp) {
            return false;
        }
        const fetchParams: RequestInit = {
            method: "POST",
            headers: JSON_HEADERS,
            body: chronicleAPIQueryBuilder({
                app: selectedApp,
                //type: "log",
                dateRangeEnd,
                dateRangeStart
            }),
            mode: "cors"
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
        let mappedItems: Types.TAppLogs = OrderedMap();
        let appLogTypes: Types.TAppLogTypes = List<string>();
        logItems.forEach((item: Types.ILogItem) => {
            item.data = decipherPlaceholders(item.data);
            mappedItems = mappedItems.set(item.id, item);

            // Build the list of app log types
            if (!appLogTypes.includes(item.type)) {
                appLogTypes = appLogTypes.push(item.type);
            }
        });

        //Merge with current data
        //const appLogs = getState().logs.appLogs;
        dispatch(setAppLogs(mappedItems));
        dispatch(setAppLogTypes(appLogTypes));
    };
};

/**
 * DynamoDB won't store empty strings (""'s), so the API
 * replaces them with CHRONICLE_PLACEHOLDER_EMPTYSTRING.
 *
 * This method replaces the placeholder with ""
 *
 * @param obj Any object type that might be in a log
 */
const decipherPlaceholders = (obj: any) => {
    if (_.isString(obj) && obj === "CHRONICLE_PLACEHOLDER_EMPTYSTRING") {
        // Convert CHRONICLE_PLACEHOLDER_EMPTYSTRING to ""
        return "";
    } else if (_.isPlainObject(obj)) {
        const newObj: any = {};
        _.forOwn(obj, (val: any, key: any) => {
            newObj[key] = decipherPlaceholders(val);
        });
        return newObj;
    } else if (_.isArray(obj)) {
        const newArr: any[] = [];
        obj.forEach((val: any) => {
            // Recursively clean each element in array
            newArr.push(decipherPlaceholders(val));
        });
        return newArr;
    }
    return obj;
};

export const clearAppLogs = () => {
    return {
        type: ActionTypes.LOGS_CLEAR_DATA
    };
};

const setAppLogs = (data: Types.TAppLogs) => {
    return {
        type: ActionTypes.LOGS_SET_DATA,
        data
    };
};

const setAppLogTypes = (data: Types.TAppLogTypes) => {
    return {
        type: ActionTypes.LOGS_SET_APP_LOG_TYPES,
        data
    };
};
