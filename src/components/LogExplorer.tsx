import * as React from "react";

import JSONTree from "react-json-tree";

import * as Types from "../common/types";

import THEME from "../common/base16.theme";

interface ILogExplorerProps {
    item: Types.ILogItem;
}

const LogExplorer: React.SFC<ILogExplorerProps> = (
    props: ILogExplorerProps
) => {
    return (
        <div className="chc-log-explorer-json-tree-container">
            <JSONTree data={props.item} theme={THEME} hideRoot />
        </div>
    );
};

export default LogExplorer;
