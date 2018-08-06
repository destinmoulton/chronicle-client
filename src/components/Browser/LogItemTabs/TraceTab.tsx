import * as React from "react";

import * as Types from "../../../common/types";

interface IProps {
    item: Types.ILogItem;
}

const TraceTab = (props: IProps) => {
    const { item } = props;

    let traceOut = [];

    if (item.trace === undefined) {
        traceOut = [<em key="none">No trace found.</em>];
    } else {
        traceOut = item.trace.map((line, indx) => {
            return (
                <div key={indx} className="chc-log-item-tab-trace-line">
                    &gt;&nbsp;{line}
                </div>
            );
        });
    }
    return <div className="chc-log-item-tab-contents">{traceOut}</div>;
};

export default TraceTab;
