import * as React from "react";
import * as moment from "moment";

import * as Types from "../../common/types";

interface ILogItemProps {
    item: Types.ILogItem;
}
const LogItem: React.SFC<ILogItemProps> = (props: ILogItemProps) => {
    const { item } = props;
    const { createdAt, type } = item;

    const time = moment(createdAt).format("MMM D, Y H:m a");
    return (
        <div className="chc-log-list-item">
            <div>{time}</div>
            <div>{type}</div>
        </div>
    );
};

export default LogItem;
