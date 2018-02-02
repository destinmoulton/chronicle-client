import * as React from "react";
import { connect } from "react-redux";

import { Row, Col } from "antd";

import * as Types from "../common/types";
import { history } from "../redux/store";
import LogList from "./LogList/LogList";
import QueryBar from "./QueryBar/QueryBar";

interface IMapStateToProps {
    appLogTypes: Types.TAppLogTypes;
    selectedApp: string;
}

interface ILogBrowserProps extends IMapStateToProps {}
interface ILogBrowserState {
    _activeLogItem: undefined | Types.ILogItem;
    _selectedAppLogTypes: string[];
}
class LogBrowser extends React.Component<ILogBrowserProps, ILogBrowserState> {
    constructor(props: ILogBrowserProps) {
        super(props);

        this.state = {
            _activeLogItem: undefined,
            _selectedAppLogTypes: props.appLogTypes.toArray() // Set all log types to active
        };

        this._handleClickLogItem = this._handleClickLogItem.bind(this);
        this._handleSelectLogTypes = this._handleSelectLogTypes.bind(this);
    }

    componentWillMount() {
        if (this.props.selectedApp === "") {
            // Redirect back to app selector
            history.push("/");
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

    _handleClickLogItem(logItem: Types.ILogItem) {
        this.setState({
            _activeLogItem: logItem
        });
    }

    render() {
        const { appLogTypes } = this.props;
        const { _activeLogItem, _selectedAppLogTypes } = this.state;

        const activeLogItemId =
            _activeLogItem !== undefined ? _activeLogItem.id : "";
        return (
            <Row>
                <Col span={24}>
                    <QueryBar
                        appLogTypes={appLogTypes}
                        onSelectLogTypes={this._handleSelectLogTypes}
                        selectedAppLogTypes={_selectedAppLogTypes}
                    />
                    <LogList
                        clickHandler={this._handleClickLogItem}
                        activeLogItemId={activeLogItemId}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { logs, query } = state;
    return {
        selectedApp: query.selectedApp,
        appLogTypes: logs.appLogTypes
    };
};

export default connect(mapStateToProps)(LogBrowser);
