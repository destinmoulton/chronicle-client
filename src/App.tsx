import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";

import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

import { IConnectedSwitchState } from "./interfaces";

const ConnectedSwitch = connect((state: IConnectedSwitchState) => ({
    location: state.location
}))(Switch as any);

const AppContainer = () => (
    <ConnectedSwitch>
        <Layout>
            <Header>Chronicle Client</Header>
            <Content>
                <Route
                    exact
                    path="/"
                    component={() => (
                        <h1>
                            Home <Link to="/about">About</Link>
                        </h1>
                    )}
                />
                <Route
                    path="/about"
                    component={() => (
                        <h1>
                            About <Link to="/">Home</Link>
                        </h1>
                    )}
                />
            </Content>
            <Footer>MIT License</Footer>
        </Layout>
    </ConnectedSwitch>
);

const App = connect((state: IConnectedSwitchState) => ({
    location: state.location
}))(AppContainer);

export default App;
