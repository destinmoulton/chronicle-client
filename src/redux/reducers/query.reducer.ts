import * as moment from "moment";

import * as ActionTypes from "../actionTypes";
import * as Types from "../../common/types";
import { getDateBeginPoint, getDateEndPoint } from "../../lib/dateRangePoints";
import { DATE_FORMAT, NUMBER_MONTHS_PAST } from "../../common/date.constants";

let INITIAL_BEGIN_MOMENT = moment().subtract(NUMBER_MONTHS_PAST, "months");

if (localStorage.getItem("dateRange.start.ISOString")) {
    INITIAL_BEGIN_MOMENT = moment(
        localStorage.getItem("dateRange.start.ISOString")
    );
}

let INITIAL_END_MOMENT = moment();
if (localStorage.getItem("dateRange.end.ISOString")) {
    INITIAL_END_MOMENT = moment(
        localStorage.getItem("dateRange.end.ISOString")
    );
}

const INITIAL_STATE: Types.IReducerQueryState = {
    dateRangeStart: getDateBeginPoint(INITIAL_BEGIN_MOMENT),
    dateRangeEnd: getDateEndPoint(INITIAL_END_MOMENT),
    selectedApp: ""
};

const queryReducer = (state = INITIAL_STATE, action: Types.IQueryAction) => {
    switch (action.type) {
        case ActionTypes.QUERY_SET_DATE_START:
            return {
                ...state,
                dateRangeStart: action.date
            };
        case ActionTypes.QUERY_SET_DATE_END:
            return {
                ...state,
                dateRangeEnd: action.date
            };
        case ActionTypes.QUERY_SET_SELECTED_APP:
            return {
                ...state,
                selectedApp: action.selectedApp
            };
        default:
            return { ...state };
    }
};

export default queryReducer;
