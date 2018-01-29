import * as React from "react";

import DateRange from "./DateRange";
import SortBy from "./SortBy";

interface IQueryBarProps {}
const QueryBar = (props: IQueryBarProps) => {
    return (
        <div className="chc-query-bar">
            <SortBy />
            <DateRange />
        </div>
    );
};

export default QueryBar;
