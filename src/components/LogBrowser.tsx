import * as React from "react";
import { connect } from "react-redux";

import * as Types from "../common/types";

import Loading from "./shared/Loading";
import LogList from "./LogList/LogList";
import TopBar from "./TopBar/TopBar";

interface IMapStateToProps {
    appLogs: Types.TAppLogs;
    appLogTypes: Types.TAppLogTypes;
    logsAreLoading: boolean;
    logsHaveData: boolean;
    selectedApp: string;
}

interface ILogBrowserProps extends IMapStateToProps {}
interface ILogBrowserState {}
class LogBrowser extends React.Component<ILogBrowserProps, ILogBrowserState> {
    constructor(props: ILogBrowserProps) {
        super(props);
    }

    render() {
        const {
            appLogs,
            appLogTypes,
            logsAreLoading,
            logsHaveData
        } = this.props;

        let contents = <Loading />;

        if (!logsAreLoading && logsHaveData) {
            contents = (
                <LogList
                    key="loglist"
                    appLogTypes={appLogTypes}
                    appLogs={appLogs}
                />
            );
        }

        return (
            <div>
                <TopBar key="topbar" />
                {contents}
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { logs, query } = state;
    return {
        appLogs: logs.appLogs,
        appLogTypes: logs.appLogTypes,
        logsAreLoading: logs.isLoading,
        logsHaveData: logs.hasData,
        selectedApp: query.selectedApp
    };
};

export default connect(mapStateToProps)(LogBrowser);
