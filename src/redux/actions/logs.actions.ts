import { API_URL } from "../../../chronicle.config";
import { LOGS_START_LOADING } from "../actionTypes";
import * as Types from "../../common/types";
import { JSON_HEADERS } from "../../common/headers";

export const loadLogs = () => {
    return (dispatch: Types.IDispatch) => {
        dispatch(setLoadingState());
        dispatch(getServerLogs());
    };
};

const setLoadingState = () => {
    return {
        type: LOGS_START_LOADING
    };
};

const getServerLogs = () => {
    return (dispatch: Types.IDispatch) => {
        const query = {};
        const fetchParams = {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify(query)
        };
        fetch(API_URL, fetchParams)
            .then(res => {
                return res.json();
            })
            .then(logs => {
                console.log(logs);
            });
    };
};
