import * as React from "react";

const ReactInspector = require("react-inspector");
const { ObjectInspector } = ReactInspector;
import { THEME_OBJECT_INSPECTOR } from "../../../common/theme.constants";
import * as Types from "../../../common/types";

interface IFullTabProps {
    item: Types.ILogItem;
}

const FullTab: React.SFC<IFullTabProps> = (props: IFullTabProps) => {
    const { item } = props;
    return (
        <div className="chc-log-item-tab-contents">
            <ObjectInspector
                data={item}
                theme={THEME_OBJECT_INSPECTOR}
                expandLevel={1}
                hideRoot
            />
        </div>
    );
};

export default FullTab;
