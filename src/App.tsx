import * as React from "react";

import { Route } from "react-router";

import { Layout, Row, Col } from "antd";
const { Content } = Layout;

import TopBar from "./components/TopBar/TopBar";
import AppSelector from "./components/AppSelector";
import LogBrowser from "./components/LogBrowser";

import LogDashboard from "./components/LogDashboard/LogDashboard";

interface IAppProps {}
const App: React.SFC<IAppProps> = (props: IAppProps) => {
    return (
        <Layout className="chc-main-container">
            <TopBar />

            <Content className="chc-layout-content">
                <Row>
                    <Col span={24}>
                        <Route exact path="/" component={AppSelector} />
                        <Route exact path="/apps" component={AppSelector} />
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
