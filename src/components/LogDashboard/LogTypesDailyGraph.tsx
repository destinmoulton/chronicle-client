import * as React from "react";
const Line = require("@nivo/line").Line;
import { Moment } from "moment";

import * as Types from "../../common/types";
import { GRAPH_DATE_FORMAT } from "../../common/date.constants";
import {
    buildChartableDataArray,
    generateDateSeries
} from "../../lib/graphprep";

const CHART_DIM = {
    WIDTH: 900,
    HEIGHT: 300,
    MARGINS: { left: 50, right: 90, top: 25, bottom: 25 }
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

    // Show bottom axis ticks at an interval
    const tickInterval = Math.ceil(dateSeries.length / 10);
    const tickValues = dateSeries.filter(
        (date, index) => index % tickInterval === 0
    );
    return (
        <div>
            <h4>
                {dateRangeStart.format("MMM DD, YYYY")}&nbsp;to&nbsp;
                {dateRangeEnd.format("MMM DD, YYYY")}
            </h4>
            {chartData.length > 0 && (
                <Line
                    data={chartData}
                    width={CHART_DIM.WIDTH}
                    height={CHART_DIM.HEIGHT}
                    margin={{ ...CHART_DIM.MARGINS }}
                    minY={0}
                    maxY="auto"
                    stacked={false}
                    axisBottom={{
                        orient: "bottom",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        tickValues,
                        legend: "Day",
                        legendOffset: 36,
                        legendPosition: "center"
                    }}
                    axisLeft={{
                        orient: "left",
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Count",
                        legendOffset: -30,
                        legendPosition: "center"
                    }}
                    enableDots={false}
                    animate={false}
                    legends={[
                        {
                            anchor: "bottom-right",
                            direction: "column",
                            translateX: 85,
                            itemWidth: 80,
                            itemHeight: 20,
                            symbolSize: 12,
                            symbolShape: "circle"
                        }
                    ]}
                />
            )}
        </div>
    );
};

export default LogTypesDailyGraph;
