import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DateRange from "./DateRange";
import * as Types from "../../common/types";

interface IMapStateToProps {
    selectedApp: string;
}
interface ITopBarProps extends IMapStateToProps {}
class TopBar extends React.Component<ITopBarProps> {
    render() {
        const { selectedApp } = this.props;
        return (
            <div className="chc-topbar-container">
                <div className="chc-topbar-tab">Dashboard</div>
                <div className="chc-topbar-tab">Browser</div>
                <div className="chc-topbar-app-name">
                    {selectedApp}(<Link to="/">Change App</Link>)
                </div>
                <DateRange />
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

export default connect(mapStateToProps)(TopBar);
