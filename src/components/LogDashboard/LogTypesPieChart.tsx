import * as React from "react";
const Pie = require("@nivo/pie").Pie;

import * as Types from "../../common/types";

import { generateLogTypesPieData } from "../../lib/graphprep";

const CHART_DIM = {
    BORDER_COLOR: "inherit:darker(0.6)",
    COLORS: "d320c",
    COLOR_BY: "id",
    CORNER_RADIUS: 3,
    HEIGHT: 400,
    INNER_RADIUS: 0.5,
    PAD_ANGLE: 0.7,
    LEGEND: {
        anchor: "bottom-right",
        direction: "column",
        translateX: 110,
        itemWidth: 100,
        itemHeight: 14,
        symbolSize: 14,
        symbolShape: "circle"
    },
    MARGINS: {
        top: 20,
        right: 100,
        bottom: 20,
        left: 80
    },
    RADIAL_LABELS: {
        SkipAngle: 10,
        TextXOffset: 6,
        TextColor: "#333333",
        LinkOffset: 0,
        LinkDiagonalLength: 16,
        LinkHorizontalLength: 24,
        LinkStrokeWidth: 1,
        LinkColor: "inherit"
    },
    SLICES_LABELS: {
        SkipAngle: 10,
        TextColor: "#333333"
    },
    WIDTH: 400
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
            innerRadius={CHART_DIM.INNER_RADIUS}
            padAngle={CHART_DIM.PAD_ANGLE}
            cornerRadius={CHART_DIM.CORNER_RADIUS}
            colors={CHART_DIM.COLORS}
            colorBy={CHART_DIM.COLOR_BY}
            borderColor={CHART_DIM.BORDER_COLOR}
            radialLabelsSkipAngle={CHART_DIM.RADIAL_LABELS.SkipAngle}
            radialLabelsTextXOffset={CHART_DIM.RADIAL_LABELS.TextXOffset}
            radialLabelsTextColor={CHART_DIM.RADIAL_LABELS.TextColor}
            radialLabelsLinkOffset={CHART_DIM.RADIAL_LABELS.LinkOffset}
            radialLabelsLinkDiagonalLength={
                CHART_DIM.RADIAL_LABELS.LinkDiagonalLength
            }
            radialLabelsLinkHorizontalLength={
                CHART_DIM.RADIAL_LABELS.LinkHorizontalLength
            }
            radialLabelsLinkStrokeWidth={
                CHART_DIM.RADIAL_LABELS.LinkStrokeWidth
            }
            radialLabelsLinkColor={CHART_DIM.RADIAL_LABELS.LinkColor}
            slicesLabelsSkipAngle={CHART_DIM.SLICES_LABELS.SkipAngle}
            slicesLabelsTextColor={CHART_DIM.SLICES_LABELS.TextColor}
            animate={false}
            legends={[CHART_DIM.LEGEND]}
        />
    );
};

export default LogTypesPieChart;
