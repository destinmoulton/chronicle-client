import { Moment } from "moment";

import * as Types from "../../common/types";

import * as ActionTypes from "../actionTypes";
import { IDispatch } from "../../common/types";
import { getDateBeginPoint, getDateEndPoint } from "../../lib/dateRangePoints";

import { loadLogs } from "../actions/logs.actions";

export const setQueryDateStart = (startMoment: Moment) => {
    return (dispatch: IDispatch) => {
        dispatch(overwriteQueryDateStart(startMoment));
        dispatch(loadLogs());
    };
};

const overwriteQueryDateStart = (startMoment: Moment) => {
    return {
        type: ActionTypes.QUERY_SET_DATE_START,
        date: getDateBeginPoint(startMoment)
    };
};

export const setQueryDateEnd = (endMoment: Moment) => {
    return (dispatch: IDispatch) => {
        dispatch(overwriteQueryDateEnd(endMoment));
        dispatch(loadLogs());
    };
};

const overwriteQueryDateEnd = (endMoment: Moment) => {
    return {
        type: ActionTypes.QUERY_SET_DATE_END,
        date: getDateEndPoint(endMoment)
    };
};

export const setSelectedApp = (selectedApp: string) => {
    return {
        type: ActionTypes.QUERY_SET_SELECTED_APP,
        selectedApp
    };
};
