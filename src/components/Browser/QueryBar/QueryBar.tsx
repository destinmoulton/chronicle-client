import * as React from "react";

import * as Types from "../../../common/types";

import RefreshButton from "./RefreshButton";
import SelectLogTypes from "./SelectLogTypes";
import SortBy from "./SortBy";

interface IQueryBarProps {
    appLogTypes: Types.TAppLogTypes;
    onSelectLogTypes: (types: string[]) => void;
    onSelectSortOrder: (order: string) => void;
    selectedAppLogTypes: string[];
    selectedSortOrder: string;
}
class QueryBar extends React.Component<IQueryBarProps> {
    render() {
        const {
            appLogTypes,
            onSelectLogTypes,
            onSelectSortOrder,
            selectedAppLogTypes,
            selectedSortOrder
        } = this.props;
        return (
            <div className="chc-browser-query-bar">
                <SortBy
                    selectedSortOrder={selectedSortOrder}
                    onSelectSortOrder={onSelectSortOrder}
                />&nbsp;&nbsp;
                <SelectLogTypes
                    appLogTypes={appLogTypes}
                    onSelectLogTypes={onSelectLogTypes}
                    selectedAppLogTypes={selectedAppLogTypes}
                />
                <RefreshButton />
            </div>
        );
    }
}

export default QueryBar;
