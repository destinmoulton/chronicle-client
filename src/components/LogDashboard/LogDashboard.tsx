import * as React from "react";
import { Moment } from "moment";
import { connect } from "react-redux";

import * as Types from "../../common/types";

import ActionsPieChart from "./ActionsPieChart";
import Loading from "../shared/Loading";
import LogTypesDailyGraph from "./LogTypesDailyGraph";
import LogTypesPieChart from "./LogTypesPieChart";
import TopBar from "../TopBar/TopBar";

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

        let content = [<Loading key="loading" />];

        if (appLogTypes.size > 0) {
            content = [
                <LogTypesPieChart
                    key="pie"
                    appLogs={appLogs}
                    appLogTypes={appLogTypes}
                />,
                <ActionsPieChart key="actionspie" appLogs={appLogs} />,
                <LogTypesDailyGraph
                    key="chart"
                    appLogs={appLogs}
                    appLogTypes={appLogTypes}
                    dateRangeStart={dateRangeStart}
                    dateRangeEnd={dateRangeEnd}
                />
            ];
        }
        return (
            <div>
                <TopBar />
                <div className="chc-dashboard-container">{content}</div>
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
