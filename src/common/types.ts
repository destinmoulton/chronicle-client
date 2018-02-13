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
    data: any;
    type: string;
}

export type TAppLogs = OrderedMap<string, ILogItem>;

export type TAppLogTypes = List<string>;

export interface ILogAction {
    type: string;
    data: TAppLogs;
}

export interface IQueryAction {
    type: string;
    date?: Moment;
    selectedApp?: string;
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
    appLogs: TAppLogs;
    appLogTypes: TAppLogTypes;
}

export interface IReducerQueryState {
    dateRangeStart: Moment;
    dateRangeEnd: Moment;
    selectedApp: string;
}

export interface IReducerSortState {
    order: string;
}

// Redux router middleware
interface IRouterReducerState {
    location: {
        hash: string;
        key: string;
        pathname: string;
        search: "";
        state: undefined;
    };
}

export interface IRootStoreState {
    apps: IReducerAppsState;
    logs: IReducerLogsState;
    query: IReducerQueryState;
    sort: IReducerSortState;
    routerReducer: IRouterReducerState;
}

/** Date Series */
export type TDateSeries = string[];
