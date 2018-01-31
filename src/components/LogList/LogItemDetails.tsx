import * as moment from "moment";
import * as React from "react";
import JSONTree from "react-json-tree";
import { Icon } from "antd";

import * as Types from "../../common/types";

import THEME from "../../common/base16.theme";

interface ILogItemExplorerProps {
    item: Types.ILogItem;
}

const LogItemExplorer: React.SFC<ILogItemExplorerProps> = (
    props: ILogItemExplorerProps
) => {
    const { item } = props;

    let details = null;

    if (typeof item.info === "string") {
        details = item.info;
    } else {
        details = <JSONTree data={item.info} theme={THEME} hideRoot />;
    }
    return (
        <div>
            <div className="chc-log-item-explorer-main-box">{details}</div>
            <div className="chc-log-item-explorer-json-tree-container">
                <JSONTree data={item} theme={THEME} hideRoot />
            </div>
        </div>
    );
};

export default LogItemExplorer;
