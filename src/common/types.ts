export type IThunkAction<R, S, E> = (
    dispatch: IDispatch<S>,
    getState: () => S,
    extraArgument: E
) => R;

export interface IDispatch<S> {
    <R, E>(asyncAction: IThunkAction<R, S, E>): R;
}
export interface IDispatch<S> {
    <A>(action: A & { type: any }): A & { type: any };
}
