import * as React from "react";

import { Route } from "react-router";

import { Layout, Row, Col } from "antd";
const { Header, Content, Footer } = Layout;

import { API_URL } from "../chronicle.config";

import AppSelector from "./components/AppSelector";
import LogBrowser from "./components/LogBrowser";

import LogDashboard from "./components/LogDashboard/LogDashboard";

interface IAppProps {}
const App: React.SFC<IAppProps> = (props: IAppProps) => {
    return (
        <Layout className="chc-main-container">
            <Header className="chc-nav-bar">
                <div className="chc-nav-title">Chronicle Client</div>
                <div className="chc-nav-api-url">{API_URL}</div>
            </Header>

            <Content>
                <Row>
                    <Col span={24}>
                        <Route exact path="/" component={AppSelector} />
                        <Route
                            exact
                            path="/dashboard"
                            component={LogDashboard}
                        />
                        <Route exact path="/browser" component={LogBrowser} />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default App;
