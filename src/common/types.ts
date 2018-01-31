import { List, OrderedMap } from "immutable";
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

// Apps
export type IAppsRawList = string[];

export type IAppsList = List<string>;

export interface IAppAction {
    type: string;
    data?: IAppsList;
}

/** Log Items and App Logs */
export interface ILogItem {
    client: any;
    createdAt: number;
    id: string;
    info: any;
    type: string;
}

export type IAppLogs = OrderedMap<string, ILogItem>;

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
export interface IReducerAppsState {
    isLoading: boolean;
    hasData: boolean;
    data: IAppsList;
}

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
    apps: IReducerAppsState;
    logs: IReducerLogsState;
    query: IReducerQueryState;
    sort: IReducerSortState;
}
