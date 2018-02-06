import * as React from "react";
import { connect } from "react-redux";

import { Select } from "antd";
const { Option } = Select;

import * as Types from "../../../common/types";

interface ISelectLogTypesProps {
    appLogTypes: Types.TAppLogTypes;
    selectedAppLogTypes: string[];
    onSelectLogTypes: (types: string[]) => void;
}

class SelectLogTypes extends React.Component<ISelectLogTypesProps> {
    render() {
        const {
            appLogTypes,
            onSelectLogTypes,
            selectedAppLogTypes
        } = this.props;

        const options: any = [];
        appLogTypes.map((type: string) => {
            options.push(
                <Option key={type} value={type}>
                    {type}
                </Option>
            );
        });
        return (
            <span>
                <Select
                    allowClear={true}
                    mode="multiple"
                    value={selectedAppLogTypes}
                    onChange={onSelectLogTypes}
                    style={{ width: "250px" }}
                >
                    {options}
                </Select>
            </span>
        );
    }
}

export default SelectLogTypes;
