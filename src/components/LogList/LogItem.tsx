import * as React from "react";
import * as moment from "moment";

interface ILogItemProps {
    item: any;
}
const LogItem: React.SFC<ILogItemProps> = (props: ILogItemProps) => {
    const { createdAt, type } = props.item;

    const time = moment(createdAt).format("MMM D, Y H:m a");
    return (
        <div>
            <div>{time}</div>
            <div>{type}</div>
        </div>
    );
};

export default LogItem;
