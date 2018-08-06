import * as React from "react";
import * as moment from "moment";
import { Button, Icon } from "antd";
import * as Types from "../../common/types";

import {
    ILogType,
    LOG_TYPE_EMPTY,
    LOG_TYPES
} from "../../common/logtypes.constants";

import LogItemTabs from "./LogItemTabs/LogItemTabs";

interface ILogItemProps {
    activeLogItemId: string;
    item: Types.ILogItem;
}

interface ILogItemState {
    isLogItemOpen: boolean;
}
class LogItem extends React.Component<ILogItemProps, ILogItemState> {
    constructor(props: ILogItemProps) {
        super(props);

        this.state = {
            isLogItemOpen: false
        };

        this._toggleExploring = this._toggleExploring.bind(this);
    }

    _toggleExploring() {
        this.setState({ isLogItemOpen: !this.state.isLogItemOpen });
    }

    _handleDevToolsLog = () => {
        console.log(this.props.item.data);
    };

    render() {
        const { isLogItemOpen } = this.state;
        const { activeLogItemId, item } = this.props;
        const { createdAt, type } = item;

        const time = moment(createdAt).format("MMM D, Y h:mm a");

        let logTypeObj: ILogType = LOG_TYPES[type] || LOG_TYPE_EMPTY;
        // custom log type
        logTypeObj.name = `${type}()`;

        const activeClass =
            activeLogItemId === item.id ? "chc-log-list-item-active" : "";

        const exploringCaret = isLogItemOpen ? "caret-down" : "caret-right";
        const details = isLogItemOpen ? <LogItemTabs item={item} /> : null;

        const summary = JSON.stringify(item.data, null, 2); //.substr(0, 60);
        return (
            <div className={"chc-log-list-item " + activeClass}>
                <div className="chc-log-list-item-title-row">
                    <div className="chc-log-list-item-title-type">
                        <Icon
                            type={exploringCaret}
                            onClick={this._toggleExploring}
                        />&nbsp;
                        <Icon
                            type={logTypeObj.icon}
                            style={{ color: logTypeObj.color }}
                        />&nbsp;
                        {logTypeObj.name}
                    </div>
                    <div className="chc-log-list-item-title-summary">
                        {summary}
                    </div>
                    <div className="chc-log-list-item-devtoolsconsole-button">
                        <a
                            onClick={this._handleDevToolsLog}
                            href="javascript:void(0);"
                            title="Show in Browser Dev Tools Console"
                        >
                            <Icon type="right-square-o" />
                        </a>
                    </div>
                    <div className="chc-log-list-item-time">{time}</div>
                </div>
                {details}
            </div>
        );
    }
}

export default LogItem;
