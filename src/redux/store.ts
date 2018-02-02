import { routerReducer, routerMiddleware } from "react-router-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import appsReducer from "./reducers/apps.reducer";
import logsReducer from "./reducers/logs.reducer";
import queryReducer from "./reducers/query.reducer";

const history = createHistory();

const store = createStore(
    combineReducers({
        apps: appsReducer,
        logs: logsReducer,
        query: queryReducer,
        routerReducer
    }),
    applyMiddleware(routerMiddleware(history), thunk)
);

export { history, store };
