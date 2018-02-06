import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { history } from "../../redux/store";

import DateRange from "./DateRange";
import * as LogsActions from "../../redux/actions/logs.actions";
import * as Types from "../../common/types";

interface IMapStateToProps {
    logsAreLoading: boolean;
    logsHaveData: boolean;
    selectedApp: string;
}

interface IMapDispatchToProps {
    loadLogs: () => void;
}
interface ITopBarProps extends IMapDispatchToProps, IMapStateToProps {}
class TopBar extends React.Component<ITopBarProps> {
    componentWillMount() {
        if (this.props.selectedApp === "") {
            // Redirect back to app selector
            history.push("/");
        } else {
            const { loadLogs, logsAreLoading, logsHaveData } = this.props;

            if (!logsAreLoading && !logsHaveData) {
                loadLogs();
            }
        }
    }

    render() {
        const { selectedApp } = this.props;
        return (
            <div className="chc-topbar-container">
                <div className="chc-topbar-tab">
                    <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className="chc-topbar-tab">
                    <Link to="/browser">Browser</Link>
                </div>
                <div className="chc-topbar-app-name">
                    {selectedApp}(<Link to="/">Change App</Link>)
                </div>
                <DateRange />
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { logs, query } = state;
    return {
        logsAreLoading: logs.isLoading,
        logsHaveData: logs.hasData,
        selectedApp: query.selectedApp
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch): IMapDispatchToProps => {
    return {
        loadLogs: () => dispatch(LogsActions.loadLogs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
