import { List } from "immutable";
import * as ActionTypes from "../actionTypes";
import * as Types from "../../common/types";

const INITIAL_STATE: Types.IReducerAppsState = {
    isLoading: false,
    hasData: false,
    data: List()
};
const appsReducer = (state = INITIAL_STATE, action: Types.IAppAction) => {
    switch (action.type) {
        case ActionTypes.APPS_CALL_BEGIN: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ActionTypes.APPS_CALL_COMPLETE: {
            return {
                ...state,
                isLoading: false
            };
        }
        case ActionTypes.APPS_WRITE_DATA: {
            return {
                ...state,
                isLoading: false,
                hasData: true,
                data: action.data
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default appsReducer;
