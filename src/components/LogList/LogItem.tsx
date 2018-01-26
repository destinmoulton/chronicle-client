import * as React from "react";
import * as moment from "moment";

import * as Types from "../../common/types";

interface ILogItemProps {
    activeLogItemId: string;
    item: Types.ILogItem;
}
const LogItem: React.SFC<ILogItemProps> = (props: ILogItemProps) => {
    const { activeLogItemId, item } = props;
    const { createdAt, type } = item;

    const time = moment(createdAt).format("MMM D, Y h:mm a");

    const activeClass =
        activeLogItemId === item.id ? "chc-log-list-item-active" : "";
    return (
        <div className={"chc-log-list-item " + activeClass}>
            <div>{time}</div>
            <div>{type}</div>
        </div>
    );
};

export default LogItem;
