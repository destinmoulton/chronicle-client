import * as React from "react";

import JSONTree from "react-json-tree";
import { Icon } from "antd";

import * as Types from "../common/types";

import THEME from "../common/base16.theme";
import { LOG_ICONS } from "../common/icons.constants";

interface ILogExplorerProps {
    item: Types.ILogItem;
}

const LogExplorer: React.SFC<ILogExplorerProps> = (
    props: ILogExplorerProps
) => {
    const { item } = props;

    const icon = LOG_ICONS[item.type] || { icon: "", color: "" };

    return (
        <div>
            <div className="chc-log-explorer-main-box">
                <Icon type={icon.icon} />
            </div>
            <div className="chc-log-explorer-json-tree-container">
                <JSONTree data={item} theme={THEME} hideRoot />
            </div>
        </div>
    );
};

export default LogExplorer;
