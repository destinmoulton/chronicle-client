import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import { store, history } from "./redux/store";

import App from "./App";

const container = document.getElementById("react-root");

/**
 * TODO: REMOVE THIS OVERRIDE
 *
 * This code just overrides the console error for the "getDefaultProps"
 * error that occurs because the ANTD date library relies on a library.
 */
const _error = window.console.error;
const warningToSuppress =
    "Warning: getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.";
export const suppressError = () => {
    window.console.error = (errorText: any): any => {
        if (errorText && errorText.indexOf(warningToSuppress) >= 0) {
            return null;
        } else {
            _error(errorText);
        }
    };
};
suppressError();
/**
 * END SUPPRESSION
 */

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    container
);
