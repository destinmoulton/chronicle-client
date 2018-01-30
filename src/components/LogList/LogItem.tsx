import * as React from "react";
import * as moment from "moment";
import { Icon } from "antd";
import * as Types from "../../common/types";

import { ILogIcon, LOG_ICONS } from "../../common/icons.constants";

interface ILogItemProps {
    activeLogItemId: string;
    item: Types.ILogItem;
}
const LogItem: React.SFC<ILogItemProps> = (props: ILogItemProps) => {
    const { activeLogItemId, item } = props;
    const { createdAt, type } = item;

    const time = moment(createdAt).format("MMM D, Y h:mm a");

    const icon: ILogIcon = LOG_ICONS[type] || { icon: "", color: "" };

    const activeClass =
        activeLogItemId === item.id ? "chc-log-list-item-active" : "";
    return (
        <div className={"chc-log-list-item " + activeClass}>
            <div className="chc-log-list-item-type">
                <Icon type={icon.icon} style={{ color: icon.color }} />&nbsp;{
                    type
                }
            </div>
            <div className="chc-log-list-item-time">{time}</div>
        </div>
    );
};

export default LogItem;
