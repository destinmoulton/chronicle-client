import { routerReducer, routerMiddleware } from "react-router-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

const store = createStore(
    combineReducers({
        routerReducer
    }),
    applyMiddleware(routerMiddleware(history))
);

export { history, store };
