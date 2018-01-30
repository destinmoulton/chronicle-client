import * as React from "react";

import DateRange from "./DateRange";
import RefreshButton from "./RefreshButton";
import SortBy from "./SortBy";

interface IQueryBarProps {}
const QueryBar = (props: IQueryBarProps) => {
    return (
        <div className="chc-query-bar">
            <SortBy />
            <DateRange />
            <RefreshButton />
        </div>
    );
};

export default QueryBar;
