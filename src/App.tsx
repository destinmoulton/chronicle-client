import * as React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

import LogBrowser from "./components/LogBrowser";

const App = () => (
    <Layout>
        <Header className="chc-nav-bar">
            <div className="chc-nav-title">Chronicle Client</div>
        </Header>
        <Content>
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
        <Footer>MIT License</Footer>
    </Layout>
);

export default App;
