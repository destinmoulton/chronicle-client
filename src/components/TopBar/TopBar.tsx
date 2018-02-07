import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { history } from "../../redux/store";

import DateRange from "./DateRange";
import * as LogsActions from "../../redux/actions/logs.actions";
import * as Types from "../../common/types";

interface ITab {
    route: string;
    name: string;
}
const TABS: ITab[] = [
    {
        route: "/apps",
        name: "Apps"
    },
    {
        route: "/dashboard",
        name: "Dashboard"
    },
    {
        route: "/browser",
        name: "Browser"
    }
];

interface IMapStateToProps {
    logsAreLoading: boolean;
    logsHaveData: boolean;
    pathname: string;
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
        const { selectedApp, pathname } = this.props;
        const tabs = TABS.map((tab: any) => {
            const activeClass =
                tab.route === pathname ? "chc-topbar-tab-active" : "";
            return (
                <div
                    key={tab.route}
                    className={"chc-topbar-tab " + activeClass}
                >
                    <Link to={tab.route}>{tab.name}</Link>
                </div>
            );
        });
        return (
            <div className="chc-topbar-container">
                {tabs}
                <div className="chc-topbar-app-name">{selectedApp}</div>
                <DateRange />
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { logs, query, routerReducer } = state;
    return {
        logsAreLoading: logs.isLoading,
        logsHaveData: logs.hasData,
        selectedApp: query.selectedApp,
        pathname: routerReducer.location.pathname
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch): IMapDispatchToProps => {
    return {
        loadLogs: () => dispatch(LogsActions.loadLogs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
