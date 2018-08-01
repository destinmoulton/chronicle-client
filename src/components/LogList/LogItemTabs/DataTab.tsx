import * as React from "react";

import * as Types from "../../../common/types";
import Inspector from "./Inspector";
interface IProps {
    item: Types.ILogItem;
}

const DataTab = (props: IProps) => {
    const { item } = props;

    let details = [];

    const data = item.data;
    if (typeof data === "string") {
        details = [data];
    } else if (Array.isArray(data)) {
        details = data.map(el => {
            if (typeof el === "string") {
                return el;
            } else {
                return <Inspector item={el} />;
            }
        });
    } else {
        details = [<Inspector item={data} />];
    }
    return <div className="chc-log-item-tab-contents">{details}</div>;
};

export default DataTab;
