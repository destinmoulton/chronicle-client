import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as Types from "../common/types";
import { getApps } from "../redux/actions/apps.actions";
import { clearAppLogs } from "../redux/actions/logs.actions";
import { setSelectedApp } from "../redux/actions/query.actions";
import { IRootStoreState } from "../common/types";

import Loading from "./shared/Loading";

interface IMapDispatchToProps {
    clearAppLogs: () => void;
    getApps: () => void;
    setSelectedApp: (app: string) => void;
}

interface IMapStateToProps {
    appsIsLoading: boolean;
    appsHasData: boolean;
    appsList: Types.IAppsList;
}
interface IAppSelectorProps extends IMapDispatchToProps, IMapStateToProps {
    selectApp: (app: string) => void;
}
class AppSelector extends React.Component<IAppSelectorProps> {
    constructor(props: IAppSelectorProps) {
        super(props);
    }

    componentDidMount() {
        this.props.clearAppLogs();
        this.props.getApps();
    }

    _handleClickApp(app: string) {
        this.props.clearAppLogs();
        this.props.setSelectedApp(app);
    }

    render() {
        const { appsIsLoading, appsHasData, appsList, selectApp } = this.props;

        let apps: any = [];
        appsList.map((app: string) => {
            apps.push(
                <li key={app} onClick={this._handleClickApp.bind(this, app)}>
                    <Link
                        to="/dashboard"
                        onClick={this._handleClickApp.bind(this, app)}
                    >
                        {app}
                    </Link>
                </li>
            );
        });

        let display = appsIsLoading || !appsHasData ? <Loading /> : apps;
        return (
            <div className="chc-app-list-box">
                <div className="chc-app-list-title">Apps</div>
                <ul className="chc-app-list">{display}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state: IRootStoreState): IMapStateToProps => {
    const { apps } = state;
    return {
        appsIsLoading: apps.isLoading,
        appsHasData: apps.hasData,
        appsList: apps.data
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch) => {
    return {
        clearAppLogs: () => dispatch(clearAppLogs()),
        getApps: () => dispatch(getApps()),
        setSelectedApp: (app: string) => dispatch(setSelectedApp(app))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppSelector);
