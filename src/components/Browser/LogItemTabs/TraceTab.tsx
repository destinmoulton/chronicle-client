import * as React from "react";

import * as Types from "../../../common/types";

interface IProps {
    item: Types.ILogItem;
}

const TraceTab = (props: IProps) => {
    const { item } = props;

    let traceOut = [];

    traceOut = item.trace.map(line => {
        return (
            <div className="chc-log-item-tab-trace-line">&gt;&nbsp;{line}</div>
        );
    });
    return <div className="chc-log-item-tab-contents">{traceOut}</div>;
};

export default TraceTab;
