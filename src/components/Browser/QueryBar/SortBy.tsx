import * as React from "react";
import { connect } from "react-redux";
import { Select } from "antd";
const Option = Select.Option;

import * as Types from "../../../common/types";

import SORTOPTIONS from "../../../common/sortoptions.constants";

interface ISortByProps {
    onSelectSortOrder: (order: string) => void;
    selectedSortOrder: string;
}
const SortBy: React.SFC<ISortByProps> = (props: ISortByProps) => {
    const { onSelectSortOrder, selectedSortOrder } = props;

    const options = SORTOPTIONS.map(option => {
        return (
            <Option key={option.value} value={option.value}>
                {option.name}
            </Option>
        );
    });
    return (
        <div className="chc-browser-select-sortorder">
            <span>Sort:&nbsp;</span>
            <Select
                defaultValue={selectedSortOrder}
                size="small"
                onChange={onSelectSortOrder}
            >
                {options}
            </Select>
        </div>
    );
};

export default SortBy;
