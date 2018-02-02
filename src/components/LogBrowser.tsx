import * as React from "react";
import { connect } from "react-redux";

import { Row, Col } from "antd";

import * as Types from "../common/types";
import { history } from "../redux/store";
import * as LogsActions from "../redux/actions/logs.actions";
import SORTOPTIONS from "../common/sortoptions.constants";

import Loading from "./shared/Loading";
import LogList from "./LogList/LogList";
import LogDashboard from "./LogDashboard/LogDashboard";
import QueryBar from "./QueryBar/QueryBar";

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

        this.state = {
            _activeLogItem: undefined,
            _selectedAppLogTypes: props.appLogTypes.toArray(), // Set all log types to active
            _selectedSortOrder: SORTOPTIONS[0].value
        };

        this._handleClickLogItem = this._handleClickLogItem.bind(this);
        this._handleSelectLogTypes = this._handleSelectLogTypes.bind(this);
        this._handleSelectSortOrder = this._handleSelectSortOrder.bind(this);
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

    componentWillReceiveProps(nextProps: ILogBrowserProps) {
        this.setState({
            _selectedAppLogTypes: nextProps.appLogTypes.toArray() // Set all log types to active
        });
    }

    _handleSelectLogTypes(types: string[]) {
        this.setState({
            _selectedAppLogTypes: types
        });
    }

    _handleSelectSortOrder(order: string) {
        this.setState({
            _selectedSortOrder: order
        });
    }

    _handleClickLogItem(logItem: Types.ILogItem) {
        this.setState({
            _activeLogItem: logItem
        });
    }

    render() {
        const { appLogTypes, logsAreLoading } = this.props;
        const {
            _activeLogItem,
            _selectedAppLogTypes,
            _selectedSortOrder
        } = this.state;

        let loading = logsAreLoading ? <Loading /> : null;
        const activeLogItemId =
            _activeLogItem !== undefined ? _activeLogItem.id : "";
        return (
            <Row>
                <Col span={24}>
                    <QueryBar
                        appLogTypes={appLogTypes}
                        onSelectLogTypes={this._handleSelectLogTypes}
                        selectedAppLogTypes={_selectedAppLogTypes}
                        onSelectSortOrder={this._handleSelectSortOrder}
                        selectedSortOrder={_selectedSortOrder}
                    />
                    <LogDashboard />
                    {/* <LogList
                        clickHandler={this._handleClickLogItem}
                        activeLogItemId={activeLogItemId}
                        selectedAppLogTypes={_selectedAppLogTypes}
                        selectedSortOrder={_selectedSortOrder}
                    /> */}
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

export default connect(mapStateToProps)(LogBrowser);
