import * as React from "react";

import DateRange from "./DateRange";

interface IQueryBarProps {}
const QueryBar = (props: IQueryBarProps) => {
    return (
        <div className="chc-query-bar">
            <DateRange />
        </div>
    );
};

export default QueryBar;
