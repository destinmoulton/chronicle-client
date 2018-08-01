import * as React from "react";
import { Moment } from "moment";
import { connect } from "react-redux";

import * as Types from "../../common/types";

import ActionsPieChart from "./ActionsPieChart";
import Loading from "../shared/Loading";
import LogTypesDailyGraph from "./LogTypesDailyGraph";
import LogTypesPieChart from "./LogTypesPieChart";
import NoData from "../shared/NoData";
import TopBar from "../TopBar/TopBar";

interface IMapStateToProps {
    appLogs: Types.TAppLogs;
    appLogTypes: Types.TAppLogTypes;
    hasLogData: boolean;
    dateRangeStart: Moment;
    dateRangeEnd: Moment;
}

interface ILogDashboard extends IMapStateToProps {}

class LogDashboard extends React.Component<ILogDashboard> {
    render() {
        const {
            appLogs,
            appLogTypes,
            hasLogData,
            dateRangeStart,
            dateRangeEnd
        } = this.props;

        let content = <Loading key="loading" />;

        if (hasLogData && appLogTypes.size === 0) {
            content = <NoData key="nodata" />;
        } else if (appLogTypes.size > 0) {
            content = (
                <div className="chc-dashboard-container">
                    <div
                        key="logtypespie"
                        className="chc-dashboard-pie-container"
                    >
                        <h3>Console Logs</h3>
                        <LogTypesPieChart
                            appLogs={appLogs}
                            appLogTypes={appLogTypes}
                        />
                    </div>
                    <div
                        key="actionspie"
                        className="chc-dashboard-pie-container"
                    >
                        <h3>Actions Logged</h3>
                        <ActionsPieChart appLogs={appLogs} />
                    </div>
                    <div
                        key="logtypeschart"
                        className="chc-dashboard-linechart-container"
                    >
                        <LogTypesDailyGraph
                            key="chart"
                            appLogs={appLogs}
                            appLogTypes={appLogTypes}
                            dateRangeStart={dateRangeStart}
                            dateRangeEnd={dateRangeEnd}
                        />
                    </div>
                    <div key="clear" className="clear-both" />
                </div>
            );
        }
        return (
            <div>
                <TopBar />
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { logs, query } = state;
    return {
        appLogs: logs.appLogs,
        appLogTypes: logs.appLogTypes,
        hasLogData: logs.hasData,
        dateRangeStart: query.dateRangeStart,
        dateRangeEnd: query.dateRangeEnd
    };
};
export default connect(mapStateToProps)(LogDashboard);
