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
export interface ILogAction {
    type: string;
}

/* Store States */
export interface IReducerLogsState {
    isLoading: boolean;
    hasData: boolean;
}

export interface IRootStoreState {
    logs: IReducerLogsState;
}
