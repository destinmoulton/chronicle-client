import * as Actions from "../actionTypes";
import * as Types from "../../common/types";

const INITIAL_STATE: Types.IReducerLogsState = {
    isLoading: false,
    hasData: false
};

export default (state = INITIAL_STATE, action: Types.ILogAction) => {
    switch (action.type) {
        case Actions.LOGS_START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        default:
            return { ...state };
    }
};
