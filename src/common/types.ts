import { OrderedMap } from "immutable";
import { Moment } from "moment";
/** Redux Interfaces */
// Redux dispatch()
export interface IDispatch {
    <R>(
        asyncAction: (dispatch: IDispatch, getState: () => IRootStoreState) => R
    ): R;
    <R>(asyncAction: (dispatch: IDispatch) => R): R;
    // (neverAction: (dispatch: Dispatch, getState: () => GetState) => never): never;
    (action: object): void;
    // (action: Thunk): ; // thunks in this app must return a promise
}

// Redux getState()
export interface IGetState {
    (): IRootStoreState;
}

// Base 16 React Themes
export interface IBase16Theme {
    [key: string]: string;
}

export type IAppLogs = OrderedMap<string, any>;

export interface ILogItem {
    client: any;
    createdAt: number;
    id: string;
    info: any;
    type: string;
}

export interface ILogAction {
    type: string;
    data: IAppLogs;
}

export interface IQueryAction {
    type: string;
    date: Moment;
}

export interface ISortAction {
    type: string;
    order: string;
}

/* Store States */
export interface IReducerLogsState {
    isLoading: boolean;
    hasData: boolean;
    appLogs: IAppLogs;
}

export interface IReducerQueryState {
    dateRangeStart: Moment;
    dateRangeEnd: Moment;
}

export interface IReducerSortState {
    order: string;
}

export interface IRootStoreState {
    logs: IReducerLogsState;
    query: IReducerQueryState;
    sort: IReducerSortState;
}
