import * as moment from "moment";
import * as React from "react";

const ReactInspector = require("react-inspector");
const { chromeLight, ObjectInspector } = ReactInspector;

import { Icon } from "antd";

import * as Types from "../../common/types";

import THEME from "../../common/base16.theme";

interface ILogItemExplorerProps {
    item: Types.ILogItem;
}

const THEME_MODIFICATION = {
    ...chromeLight,
    ARROW_FONT_SIZE: 14,
    BASE_FONT_SIZE: "14px",
    TREENODE_FONT_SIZE: "14px",
    TREENODE_LINE_HEIGHT: "16px"
};

const LogItemExplorer: React.SFC<ILogItemExplorerProps> = (
    props: ILogItemExplorerProps
) => {
    const { item } = props;

    let details = null;

    if (typeof item.info === "string") {
        details = item.info;
    } else {
        details = (
            <ObjectInspector
                theme={THEME_MODIFICATION}
                data={item.info}
                hideRoot
            />
        );
    }
    return (
        <div>
            <div className="chc-log-item-explorer-main-box">{details}</div>
            <div className="chc-log-item-explorer-json-tree-container">
                <ObjectInspector
                    data={item}
                    theme={THEME_MODIFICATION}
                    hideRoot
                />
            </div>
        </div>
    );
};

export default LogItemExplorer;
