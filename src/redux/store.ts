import { connectRouter, routerMiddleware } from "connected-react-router";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import appsReducer from "./reducers/apps.reducer";
import logsReducer from "./reducers/logs.reducer";
import queryReducer from "./reducers/query.reducer";

const history = createHistory();

const store = createStore(
    connectRouter(history)(
        combineReducers({
            apps: appsReducer,
            logs: logsReducer,
            query: queryReducer
        })
    ),
    applyMiddleware(routerMiddleware(history), thunk)
);

export { history, store };
