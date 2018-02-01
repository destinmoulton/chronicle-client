import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "antd";

import * as Types from "../common/types";
import { getApps } from "../redux/actions/apps.actions";
import { clearAppLogs } from "../redux/actions/logs.actions";
import { setSelectedApp } from "../redux/actions/query.actions";
import { IRootStoreState } from "../common/types";

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
                <div key={app}>
                    <Link
                        to="/browser"
                        onClick={this._handleClickApp.bind(this, app)}
                    >
                        {app}
                    </Link>
                </div>
            );
        });

        let display =
            appsIsLoading || !appsHasData ? <Icon type="loading" /> : apps;

        return <div>{display}</div>;
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