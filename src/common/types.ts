import { Map } from "immutable";
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

/* Redux Actions */
export type IAppLogs = Map<string, any>;

export interface ILogAction {
    type: string;
    appLogs: IAppLogs;
}

/* Store States */
export interface IReducerLogsState {
    isLoading: boolean;
    hasData: boolean;
    appLogs: IAppLogs;
}

export interface IRootStoreState {
    logs: IReducerLogsState;
}
