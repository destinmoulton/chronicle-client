import * as React from "react";

import JSONTree from "react-json-tree";

import * as Types from "../common/types";

interface ILogExplorerProps {
    item: Types.ILogItem;
}
const LogExplorer: React.SFC<ILogExplorerProps> = (
    props: ILogExplorerProps
) => {
    console.log(props.item);
    return (
        <div>
            <JSONTree data={props.item} />
        </div>
    );
};

export default LogExplorer;
