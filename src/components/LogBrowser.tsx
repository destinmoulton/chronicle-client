import * as React from "react";
import { connect } from "react-redux";

import { Row, Col } from "antd";

import * as Types from "../common/types";
import { history } from "../redux/store";
import * as LogsActions from "../redux/actions/logs.actions";

import Loading from "./shared/Loading";
import LogList from "./LogList/LogList";
import LogDashboard from "./LogDashboard/LogDashboard";
import TopBar from "./TopBar/TopBar";

interface IMapStateToProps {
    appLogs: Types.TAppLogs;
    appLogTypes: Types.TAppLogTypes;
    logsAreLoading: boolean;
    logsHaveData: boolean;
    selectedApp: string;
}

interface IMapDispatchToProps {
    loadLogs: () => void;
}

interface ILogBrowserProps extends IMapStateToProps, IMapDispatchToProps {}
interface ILogBrowserState {
    _activeLogItem: undefined | Types.ILogItem;
    _selectedAppLogTypes: string[];
    _selectedSortOrder: string;
}
class LogBrowser extends React.Component<ILogBrowserProps, ILogBrowserState> {
    constructor(props: ILogBrowserProps) {
        super(props);
    }

    componentWillMount() {
        if (this.props.selectedApp === "") {
            // Redirect back to app selector
            history.push("/");
        } else {
            const { loadLogs, logsAreLoading, logsHaveData } = this.props;

            if (!logsAreLoading && !logsHaveData) {
                loadLogs();
            }
        }
    }

    render() {
        const { appLogs, appLogTypes, logsAreLoading } = this.props;

        let contents = logsAreLoading ? <Loading /> : <LogDashboard />;

        return (
            <Row>
                <Col span={24}>
                    {contents}
                    <LogList appLogTypes={appLogTypes} appLogs={appLogs} />
                </Col>
            </Row>
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

const mapDispatchToProps = (dispatch: Types.IDispatch): IMapDispatchToProps => {
    return {
        loadLogs: () => dispatch(LogsActions.loadLogs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogBrowser);
