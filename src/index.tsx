import * as React from "react";
import { render } from "react-dom";
import { connect, Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import { store, history } from "./redux/store";

import App from "./App";

const container = document.getElementById("react-root");
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    container
);
