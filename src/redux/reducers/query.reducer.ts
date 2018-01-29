import * as moment from "moment";

import * as ActionTypes from "../actionTypes";
import { DATE_FORMAT } from "../../common/date.constants";

const INITIAL_STATE = {
    dateRangeStart: moment()
        .subtract(3, "months")
        .format(DATE_FORMAT),
    dateRangeEnd: moment().format(DATE_FORMAT)
};

const queryReducer = (state = INITIAL_STATE, action) => {
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
