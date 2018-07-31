import * as React from "react";

const NoData = () => {
    return (
        <div key="nodata" id="chc-dashboard-nodata">
            No logs were found for the specified date range.
            <br />Change the dates above.
        </div>
    );
};

export default NoData;
