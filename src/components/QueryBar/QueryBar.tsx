import * as React from "react";
import { connect } from "react-redux";

import * as Types from "../../common/types";

import DateRange from "./DateRange";
import RefreshButton from "./RefreshButton";
import SortBy from "./SortBy";

interface IMapStateToProps {
    selectedApp: string;
}
interface IQueryBarProps extends IMapStateToProps {}
class QueryBar extends React.Component<IQueryBarProps> {
    render() {
        return (
            <div className="chc-query-bar">
                <strong>{this.props.selectedApp}</strong>
                <SortBy />
                <DateRange />
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
