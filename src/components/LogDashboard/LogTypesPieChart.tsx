import * as React from "react";
const Pie = require("@nivo/pie").Pie;

import * as Types from "../../common/types";

import { generateLogTypesPieData } from "../../lib/graphprep";

const CHART_DIM = {
    WIDTH: 400,
    HEIGHT: 400,
    MARGINS: {
        top: 20,
        right: 100,
        bottom: 20,
        left: 80
    },
    LEGEND: {
        anchor: "bottom-right",
        direction: "column",
        translateX: 110,
        itemWidth: 100,
        itemHeight: 14,
        symbolSize: 14,
        symbolShape: "circle"
    }
};

interface ILogTypesDailyGraphProps {
    appLogs: Types.TAppLogs;
    appLogTypes: Types.TAppLogTypes;
}

const LogTypesPieChart = (props: ILogTypesDailyGraphProps) => {
    const graphableData = generateLogTypesPieData(
        props.appLogTypes,
        props.appLogs
    );
    return (
        <Pie
            data={graphableData}
            width={CHART_DIM.WIDTH}
            height={CHART_DIM.HEIGHT}
            margin={{ ...CHART_DIM.MARGINS }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors="d320c"
            colorBy="id"
            borderColor="inherit:darker(0.6)"
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor="inherit"
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={false}
            legends={[CHART_DIM.LEGEND]}
        />
    );
};

export default LogTypesPieChart;
