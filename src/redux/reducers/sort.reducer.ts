import * as ActionTypes from "../actionTypes";
import * as Types from "../../common/types";

const INITIAL_STATE: Types.IReducerSortState = {
    order: "createdAt:desc"
};
const sortReducer = (state = INITIAL_STATE, action: Types.ISortAction) => {
    switch (action.type) {
        case ActionTypes.SORT_SET_SORT_ORDER:
            return {
                ...state,
                order: action.order
            };
        default:
            return { ...state };
    }
};

export default sortReducer;
