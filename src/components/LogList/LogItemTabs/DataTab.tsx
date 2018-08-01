import * as React from "react";

import * as Types from "../../../common/types";
import Generic from "./Generic";
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
                return <Generic item={el} />;
            }
        });
    } else {
        details = [<Generic item={data} />];
    }
    return <div className="chc-log-item-tab-contents">{details}</div>;
};

export default DataTab;
