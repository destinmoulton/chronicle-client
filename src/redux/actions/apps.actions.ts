import { List } from "immutable";
import { API_URL } from "../../../chronicle.config";
import * as ActionTypes from "../actionTypes";
import * as Types from "../../common/types";

import { JSON_HEADERS } from "../../common/headers";

export const getApps = () => {
    return (dispatch: Types.IDispatch, getState: Types.IGetState) => {
        dispatch(setAppCallBegin());
        dispatch(apiGetApps());
    };
};

const setAppCallBegin = (): Types.IAppAction => {
    return {
        type: ActionTypes.APPS_CALL_BEGIN
    };
};

const apiGetApps = () => {
    return (dispatch: Types.IDispatch) => {
        const url = API_URL + "/apps";
        const params: RequestInit = {
            method: "GET",
            headers: JSON_HEADERS,
            mode: "cors"
        };

        fetch(url, params)
            .then(res => {
                return res.json();
            })
            .then((apps: any) => {
                dispatch(setAppCallComplete());
                dispatch(prepareData(apps.apps));
            })
            .catch(err => {
                console.error(err);
            });
    };
};

const setAppCallComplete = (): Types.IAppAction => {
    return {
        type: ActionTypes.APPS_CALL_COMPLETE
    };
};

const prepareData = (apps: Types.IAppsRawList) => {
    return (dispatch: Types.IDispatch) => {
        dispatch(writeAppData(List.of(...apps)));
    };
};

const writeAppData = (data: Types.IAppsList): Types.IAppAction => {
    return {
        type: ActionTypes.APPS_WRITE_DATA,
        data
    };
};
