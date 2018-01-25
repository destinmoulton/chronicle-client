import { Map } from "immutable";
import * as Actions from "../actionTypes";
import * as Types from "../../common/types";

const INITIAL_STATE: Types.IReducerLogsState = {
    isLoading: false,
    hasData: false,
    appLogs: Map()
};

export default (state = INITIAL_STATE, action: Types.ILogAction) => {
    switch (action.type) {
        case Actions.LOGS_START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case Actions.LOGS_APP_DATA_LOADED:
            return {
                ...state,
                isLoading: false,
                hasData: true,
                appLogs: action.appLogs
            };
        default:
            return { ...state };
    }
};
