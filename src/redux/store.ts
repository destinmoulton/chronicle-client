import { routerReducer, routerMiddleware } from "react-router-redux";
import { createStore, applyMiddleware } from "redux";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

const store = createStore(
    routerReducer,
    applyMiddleware(routerMiddleware(history))
);

export { history, store };
