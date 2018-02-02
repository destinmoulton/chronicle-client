import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as Types from "../../common/types";

import DateRange from "./DateRange";
import RefreshButton from "./RefreshButton";
import SelectLogTypes from "./SelectLogTypes";
import SortBy from "./SortBy";

interface IMapStateToProps {
    selectedApp: string;
}
interface IQueryBarProps extends IMapStateToProps {
    appLogTypes: Types.TAppLogTypes;
    onSelectLogTypes: (types: string[]) => void;
    selectedAppLogTypes: string[];
}
class QueryBar extends React.Component<IQueryBarProps> {
    render() {
        const {
            appLogTypes,
            onSelectLogTypes,
            selectedAppLogTypes
        } = this.props;
        return (
            <div className="chc-query-bar">
                <strong>&nbsp;{this.props.selectedApp}</strong>(<Link to="/">
                    Change App
                </Link>)&nbsp;&nbsp;
                <SortBy />&nbsp;&nbsp;
                <SelectLogTypes
                    appLogTypes={appLogTypes}
                    onSelectLogTypes={onSelectLogTypes}
                    selectedAppLogTypes={selectedAppLogTypes}
                />
                <DateRange />&nbsp;&nbsp;
                <RefreshButton />
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { query } = state;
    return {
        selectedApp: query.selectedApp
    };
};
export default connect(mapStateToProps)(QueryBar);
