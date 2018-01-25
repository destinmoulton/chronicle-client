import * as React from "react";
import { Spin } from "antd";
const LoadingLogs: React.SFC = props => (
    <div className="loading">
        <Spin />
        <br />Loading logs...
    </div>
);

export default LoadingLogs;
