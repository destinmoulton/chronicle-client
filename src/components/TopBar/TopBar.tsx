import * as React from "react";
import DateRange from "./QueryBar/DateRange";

interface ITopBarProps {}
const TopBar: React.SFC<ITopBarProps> = (props: ITopBarProps) => {
    return (
        <div>
            <DateRange />
        </div>
    );
};

export default TopBar;