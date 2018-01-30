import * as moment from "moment";

import * as ActionTypes from "../actionTypes";
import * as Types from "../../common/types";
import { getDateBeginPoint, getDateEndPoint } from "../../lib/dateRangePoints";
import { DATE_FORMAT, NUMBER_MONTHS_PAST } from "../../common/date.constants";

const INITIAL_STATE: Types.IReducerQueryState = {
    dateRangeStart: getDateBeginPoint(
        moment().subtract(NUMBER_MONTHS_PAST, "months") // Some number months ago
    ),
    dateRangeEnd: getDateEndPoint(moment()) // Today
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
        default:
            return { ...state };
    }
};

export default queryReducer;
