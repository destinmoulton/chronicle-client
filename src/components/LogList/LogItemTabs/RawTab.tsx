import * as React from "react";

const ReactInspector = require("react-inspector");
const { ObjectInspector } = ReactInspector;
import { THEME_OBJECT_INSPECTOR } from "../../../common/theme.constants";
import * as Types from "../../../common/types";

interface IRawTabProps {
    item: Types.ILogItem;
}

const RawTab: React.SFC<IRawTabProps> = (props: IRawTabProps) => {
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

export default RawTab;
