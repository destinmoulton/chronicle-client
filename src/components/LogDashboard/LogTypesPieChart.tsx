import * as React from "react";
const Pie = require("@nivo/pie").Pie;
import { Moment } from "moment";

import * as Types from "../../common/types";

import { generatePieData } from "../../lib/graphprep";

const CHART_DIM = {
    WIDTH: 400,
    HEIGHT: 400,
    MARGINS: {
        top: 40,
        right: 80,
        bottom: 80,
        left: 80
    }
};

interface ILogTypesDailyGraphProps {
    appLogs: Types.TAppLogs;
    appLogTypes: Types.TAppLogTypes;
}

const LogTypesPieChart = (props: ILogTypesDailyGraphProps) => {
    const graphableData = generatePieData(props.appLogTypes, props.appLogs);
    return (
        <div>
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
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        translateY: 56,
                        itemWidth: 100,
                        itemHeight: 14,
                        symbolSize: 14,
                        symbolShape: "circle"
                    }
                ]}
            />
        </div>
    );
};

export default LogTypesPieChart;