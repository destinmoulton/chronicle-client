import * as React from "react";

const ReactInspector = require("react-inspector");
const { ObjectInspector } = ReactInspector;

import * as Types from "../../../common/types";
import { THEME_OBJECT_INSPECTOR } from "../../../common/theme.constants";

interface IProps {
    item: any;
}

const Inspector = (props: IProps) => {
    const { item } = props;
    return (
        <ObjectInspector theme={THEME_OBJECT_INSPECTOR} data={item} hideRoot />
    );
};

export default Inspector;
