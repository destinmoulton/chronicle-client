import * as React from "react";
import * as moment from "moment";
import { Icon } from "antd";
import * as Types from "../../common/types";

import {
    ILogType,
    LOG_TYPE_EMPTY,
    LOG_TYPES
} from "../../common/logtypes.constants";

interface ILogItemProps {
    activeLogItemId: string;
    item: Types.ILogItem;
}

interface ILogItemState {
    isExploring: boolean;
}
class LogItem extends React.Component<ILogItemProps, ILogItemState> {
    constructor(props: ILogItemProps) {
        super(props);

        this.setState({
            isExploring: false
        });

        this._toggleExploring = this._toggleExploring.bind(this);
    }

    _toggleExploring() {
        this.setState({ isExploring: !this.state.isExploring });
    }

    render() {
        const { isExploring } = this.state;
        const { activeLogItemId, item } = this.props;
        const { createdAt, type } = item;

        const time = moment(createdAt).format("MMM D, Y h:mm a");

        const logTypeObj: ILogType = LOG_TYPES[type] || LOG_TYPE_EMPTY;

        const activeClass =
            activeLogItemId === item.id ? "chc-log-list-item-active" : "";

        const exploringCaret = isExploring ? "caret-down" : "caret-right";
        return (
            <div className={"chc-log-list-item " + activeClass}>
                <div className="chc-log-list-item-type">
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
                <div className="chc-log-list-item-time">{time}</div>
            </div>
        );
    }
}

export default LogItem;
