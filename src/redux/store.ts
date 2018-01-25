import { routerReducer, routerMiddleware } from "react-router-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import logsReducer from "./reducers/logs.reducer";

const history = createHistory();

const store = createStore(
    combineReducers({
        logs: logsReducer,
        routerReducer
    }),
    applyMiddleware(routerMiddleware(history), thunk)
);

export { history, store };
