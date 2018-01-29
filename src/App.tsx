import * as React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

import { API_URL } from "../chronicle.config";

import QueryBar from "./components/QueryBar/QueryBar";
import LogBrowser from "./components/LogBrowser";

const App = () => (
    <Layout className="chc-main-container">
        <Header className="chc-nav-bar">
            <div className="chc-nav-title">Chronicle Client</div>
            <div className="chc-nav-api-url">{API_URL}</div>
        </Header>

        <Content>
            <QueryBar />
            <Route exact path="/" component={LogBrowser} />
            <Route
                path="/about"
                component={() => (
                    <h1>
                        About <Link to="/">Home</Link>
                    </h1>
                )}
            />
        </Content>
    </Layout>
);

export default App;
