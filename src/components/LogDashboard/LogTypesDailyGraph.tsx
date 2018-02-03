import * as React from "react";
const ResponsiveLine = require("@nivo/line").ResponsiveLine;
import { Moment } from "moment";

import * as Types from "../../common/types";
import { GRAPH_DATE_FORMAT } from "../../common/date.constants";
import {
    buildChartableDataArray,
    generateDateSeries
} from "../../lib/graphprep";

const CHART_DIM = {
    WIDTH: 500,
    HEIGHT: 300,
    MARGINS: { left: 50, right: 50, top: 25, bottom: 25 }
};

interface ILogTypesDailyGraphProps {
    appLogs: Types.TAppLogs;
    appLogTypes: Types.TAppLogTypes;
    dateRangeEnd: Moment;
    dateRangeStart: Moment;
}
const LogTypesDailyGraph: React.SFC<ILogTypesDailyGraphProps> = (
    props: ILogTypesDailyGraphProps
) => {
    const { appLogs, appLogTypes, dateRangeEnd, dateRangeStart } = props;
    const dateSeries = generateDateSeries(dateRangeStart, dateRangeEnd);

    const chartData = buildChartableDataArray(dateSeries, appLogTypes, appLogs);

    return (
        <div>
            <ResponsiveLine
                data={chartData}
                margin={{
                    top: 50,
                    right: 110,
                    bottom: 50,
                    left: 60
                }}
                minY="auto"
                stacked={false}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "country code",
                    legendOffset: 36,
                    legendPosition: "center"
                }}
                axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "count",
                    legendOffset: -40,
                    legendPosition: "center"
                }}
                dotSize={10}
                dotColor="inherit:darker(0.3)"
                dotBorderWidth={2}
                dotBorderColor="#ffffff"
                enableDotLabel={true}
                dotLabel="y"
                dotLabelYOffset={-12}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        translateX: 100,
                        itemWidth: 80,
                        itemHeight: 20,
                        symbolSize: 12,
                        symbolShape: "circle"
                    }
                ]}
            />
        </div>
    );
};

export default LogTypesDailyGraph;
