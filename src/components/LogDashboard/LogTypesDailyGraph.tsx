import * as React from "react";
import { Moment } from "moment";

import * as Types from "../../common/types";
import { generateDateSeries } from "../../lib/graphprep";

interface ILogTypesDailyGraphProps {
    appLogs: Types.TAppLogs;
    appLogTypes: Types.TAppLogTypes;
    dateRangeEnd: Moment;
    dateRangeStart: Moment;
}
const LogTypesDailyGraph: React.SFC<ILogTypesDailyGraphProps> = (
    props: ILogTypesDailyGraphProps
) => {
    const { dateRangeEnd, dateRangeStart } = props;
    console.log(generateDateSeries(dateRangeStart, dateRangeEnd));
    return <div />;
};

export default LogTypesDailyGraph;
