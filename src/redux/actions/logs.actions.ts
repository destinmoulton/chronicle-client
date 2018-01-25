import { Map } from "immutable";

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
        type: ActionTypes.LOGS_START_LOADING
    };
};

const getServerLogs = () => {
    return (dispatch: Types.IDispatch) => {
        const query = {};
        const fetchParams = {
            method: "POST",
            headers: JSON_HEADERS,
            body: chronicleAPIQueryBuilder({ app: "Nic Cage App", type: "log" })
        };
        fetch(API_URL + "/query", fetchParams)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data.Items !== undefined) {
                    dispatch(prepareAppLogs(data));
                } else {
                    console.error(
                        "logs.actions :: getServerLogs() :: No Items in data.",
                        data
                    );
                }
            });
    };
};

const prepareAppLogs = (data: any) => {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        // Build a map of the Items
        let mappedItems: Types.IAppLogs = Map();
        data.Items.forEach((item: any) => {
            mappedItems = mappedItems.set(item.id, item);
        });

        //Merge with current data
        const appLogs = getState().logs.appLogs;
        const newAppLogs = appLogs.merge(mappedItems);
        dispatch(setLoadedAppLogs(newAppLogs));
    };
};

const setLoadedAppLogs = (appLogs: Map<string, any>) => {
    return {
        type: ActionTypes.LOGS_APP_DATA_LOADED,
        appLogs
    };
};
