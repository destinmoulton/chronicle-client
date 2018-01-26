import * as React from "react";

import { Row, Col } from "antd";

import * as Types from "../common/types";
import LogExplorer from "./LogExplorer";
import LogList from "./LogList/LogList";

interface ILogBrowserProps {}
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

    _handleClickLogItem = (logItem: Types.ILogItem) => {
        this.setState({
            _activeLogItem: logItem
        });
    };

    render() {
        const { _activeLogItem } = this.state;
        const logExplorer =
            _activeLogItem !== undefined ? (
                <LogExplorer item={_activeLogItem} />
            ) : null;

        const activeLogItemId =
            _activeLogItem !== undefined ? _activeLogItem.id : "";
        return (
            <Row>
                <Col span={4}>
                    <LogList
                        clickHandler={this._handleClickLogItem}
                        activeLogItemId={activeLogItemId}
                    />
                </Col>
                <Col span={20}>{logExplorer}</Col>
            </Row>
        );
    }
}

export default LogBrowser;
