import * as ActionTypes from "../actionTypes";

export const setSortOrder = (newOrder: string) => {
    return {
        action: ActionTypes.SORT_SET_SORT_ORDER,
        order: newOrder
    };
};
