import * as React from "react";
import { connect } from "react-redux";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

import { API_URL } from "../chronicle.config";
import * as Types from "./common/types";

import AppSelector from "./components/AppSelector";
import LogBrowser from "./components/LogBrowser";

interface IMapStateToProps {
    selectedApp: string;
}
interface IAppProps extends IMapStateToProps {}
class App extends React.Component<IAppProps> {
    render() {
        const { selectedApp } = this.props;

        let app = null;
        if (selectedApp !== "") {
            app = (
                <span>
                    {selectedApp}(<Link to="/">Change App</Link>)
                </span>
            );
        }
        return (
            <Layout className="chc-main-container">
                <Header className="chc-nav-bar">
                    <div className="chc-nav-title">Chronicle Client</div>
                    <div className="chc-nav-title-app">{app}</div>
                    <div className="chc-nav-api-url">{API_URL}</div>
                </Header>

                <Content>
                    <Route exact path="/" component={AppSelector} />
                    <Route exact path="/browser" component={LogBrowser} />
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { query } = state;
    return {
        selectedApp: query.selectedApp
    };
};

export default connect(mapStateToProps)(App);
