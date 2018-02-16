import * as React from "react";
const Pie = require("@nivo/pie").Pie;

import * as Types from "../../common/types";

import { generateLogTypesPieData } from "../../lib/graphprep";
import { PIE } from "../../common/nivo.constants";

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
            width={PIE.WIDTH}
            height={PIE.HEIGHT}
            margin={{ ...PIE.MARGINS }}
            innerRadius={PIE.INNER_RADIUS}
            padAngle={PIE.PAD_ANGLE}
            cornerRadius={PIE.CORNER_RADIUS}
            colors={PIE.COLORS}
            colorBy={PIE.COLOR_BY}
            borderColor={PIE.BORDER_COLOR}
            radialLabelsSkipAngle={PIE.RADIAL_LABELS.SkipAngle}
            radialLabelsTextXOffset={PIE.RADIAL_LABELS.TextXOffset}
            radialLabelsTextColor={PIE.RADIAL_LABELS.TextColor}
            radialLabelsLinkOffset={PIE.RADIAL_LABELS.LinkOffset}
            radialLabelsLinkDiagonalLength={
                PIE.RADIAL_LABELS.LinkDiagonalLength
            }
            radialLabelsLinkHorizontalLength={
                PIE.RADIAL_LABELS.LinkHorizontalLength
            }
            radialLabelsLinkStrokeWidth={PIE.RADIAL_LABELS.LinkStrokeWidth}
            radialLabelsLinkColor={PIE.RADIAL_LABELS.LinkColor}
            slicesLabelsSkipAngle={PIE.SLICES_LABELS.SkipAngle}
            slicesLabelsTextColor={PIE.SLICES_LABELS.TextColor}
            animate={false}
            legends={[PIE.LEGEND]}
        />
    );
};

export default LogTypesPieChart;
