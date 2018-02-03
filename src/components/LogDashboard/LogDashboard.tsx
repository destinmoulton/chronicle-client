import * as React from "react";
import { Moment } from "moment";
import { connect } from "react-redux";

import * as Types from "../../common/types";

import LogTypesDailyGraph from "./LogTypesDailyGraph";
interface IMapStateToProps {
    appLogs: Types.TAppLogs;
    appLogTypes: Types.TAppLogTypes;
    dateRangeStart: Moment;
    dateRangeEnd: Moment;
}

interface ILogDashboard extends IMapStateToProps {}

class LogDashboard extends React.Component<ILogDashboard> {
    render() {
        const {
            appLogs,
            appLogTypes,
            dateRangeStart,
            dateRangeEnd
        } = this.props;
        return (
            <div>
                <h3>Dashboard</h3>
                <LogTypesDailyGraph
                    appLogs={appLogs}
                    appLogTypes={appLogTypes}
                    dateRangeStart={dateRangeStart}
                    dateRangeEnd={dateRangeEnd}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { logs, query } = state;
    return {
        appLogs: logs.appLogs,
        appLogTypes: logs.appLogTypes,
        dateRangeStart: query.dateRangeStart,
        dateRangeEnd: query.dateRangeEnd
    };
};
export default connect(mapStateToProps)(LogDashboard);
