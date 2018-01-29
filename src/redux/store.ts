import { routerReducer, routerMiddleware } from "react-router-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import logsReducer from "./reducers/logs.reducer";
import queryReducer from "./reducers/query.reducer";

const history = createHistory();

const store = createStore(
    combineReducers({
        logs: logsReducer,
        query: queryReducer,
        routerReducer
    }),
    applyMiddleware(routerMiddleware(history), thunk)
);

export { history, store };
