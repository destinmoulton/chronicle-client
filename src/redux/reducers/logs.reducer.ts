import { OrderedMap } from "immutable";
import * as ActionTypes from "../actionTypes";
import * as Types from "../../common/types";

const INITIAL_STATE: Types.IReducerLogsState = {
    isLoading: false,
    hasData: false,
    appLogs: OrderedMap<string, any>()
};

export default (state = INITIAL_STATE, action: Types.ILogAction) => {
    switch (action.type) {
        case ActionTypes.LOGS_API_CALL_BEGIN:
            return {
                ...state,
                isLoading: true,
                hasData: false,
                appLogs: OrderedMap<string, any>()
            };
        case ActionTypes.LOGS_API_CALL_COMPLETE:
            return {
                ...state,
                isLoading: false
            };
        case ActionTypes.LOGS_WRITE_DATA:
            return {
                ...state,
                hasData: true,
                appLogs: action.data
            };
        default:
            return { ...state };
    }
};
