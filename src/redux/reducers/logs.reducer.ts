import { List, OrderedMap } from "immutable";
import * as ActionTypes from "../actionTypes";
import * as Types from "../../common/types";

const INITIAL_STATE: Types.IReducerLogsState = {
    isLoading: false,
    hasData: false,
    appLogs: OrderedMap<string, Types.ILogItem>(),
    appLogTypes: List<string>()
};

export default (state = INITIAL_STATE, action: Types.ILogAction) => {
    switch (action.type) {
        case ActionTypes.LOGS_CLEAR_DATA: {
            return {
                ...state,
                isLoading: false,
                hasData: false,
                appLogs: OrderedMap<string, Types.ILogItem>(),
                appLogTypes: List<string>()
            };
        }
        case ActionTypes.LOGS_API_CALL_BEGIN: {
            return {
                ...state,
                isLoading: true,
                hasData: false,
                appLogs: OrderedMap<string, Types.ILogItem>()
            };
        }
        case ActionTypes.LOGS_API_CALL_COMPLETE: {
            return {
                ...state,
                isLoading: false
            };
        }
        case ActionTypes.LOGS_SET_DATA: {
            return {
                ...state,
                hasData: true,
                appLogs: action.data
            };
        }
        case ActionTypes.LOGS_SET_APP_LOG_TYPES: {
            return {
                ...state,
                appLogTypes: action.data
            };
        }
        default:
            return { ...state };
    }
};
