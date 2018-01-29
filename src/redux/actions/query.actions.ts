import { Moment } from "moment";

import * as ActionTypes from "../actionTypes";

export const setQueryDateStart = (startMoment: Moment) => {
    return {
        type: ActionTypes.QUERY_SET_DATE_START,
        date: startMoment
    };
};

export const setQueryDateEnd = (endMoment: Moment) => {
    return {
        type: ActionTypes.QUERY_SET_DATE_END,
        date: endMoment
    };
};
