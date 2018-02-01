import * as React from "react";
import { connect } from "react-redux";

import { Row, Col } from "antd";

import * as Types from "../common/types";
import { history } from "../redux/store";
import LogList from "./LogList/LogList";
import QueryBar from "./QueryBar/QueryBar";

interface IMapStateToProps {
    selectedApp: string;
}

interface ILogBrowserProps extends IMapStateToProps {}
interface ILogBrowserState {
    _activeLogItem: undefined | Types.ILogItem;
}
class LogBrowser extends React.Component<ILogBrowserProps, ILogBrowserState> {
    constructor(props: ILogBrowserProps) {
        super(props);

        this.state = {
            _activeLogItem: undefined
        };

        this._handleClickLogItem = this._handleClickLogItem.bind(this);
    }

    componentWillMount() {
        if (this.props.selectedApp === "") {
            // Redirect back to app selector
            history.push("/");
        }
    }

    _handleClickLogItem = (logItem: Types.ILogItem) => {
        this.setState({
            _activeLogItem: logItem
        });
    };

    render() {
        const { _activeLogItem } = this.state;

        const activeLogItemId =
            _activeLogItem !== undefined ? _activeLogItem.id : "";
        return (
            <Row>
                <Col span={24}>
                    <QueryBar />
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
    const { query } = state;
    return {
        selectedApp: query.selectedApp
    };
};

export default connect(mapStateToProps)(LogBrowser);
