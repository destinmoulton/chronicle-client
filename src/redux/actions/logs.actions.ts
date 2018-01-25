import { API_URL } from "../../../chronicle.config";
import {} from "../actionTypes";
import * as Types from "../../common/types";

const getLogs = () => {
    return (dispatch: Types.IDispatch) => {
        const fetchParams = {};
        fetch(API_URL, fetchParams);
    };
};
