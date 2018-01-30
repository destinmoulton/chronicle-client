import * as ActionTypes from "../actionTypes";

export const setSortOrder = (newOrder: string) => {
    return {
        type: ActionTypes.SORT_SET_SORT_ORDER,
        order: newOrder
    };
};
