import { routerReducer, routerMiddleware } from "react-router-redux";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

const store = createStore(
    combineReducers({
        routerReducer
    }),
    applyMiddleware(routerMiddleware(history), thunk)
);

export { history, store };
