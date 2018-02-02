import * as React from "react";
import { connect } from "react-redux";

import * as Types from "../../common/types";

import * as LogsActions from "../../redux/actions/logs.actions";

import LoadingLogs from "./LoadingLogs";
import LogItem from "./LogItem";

import { comparatorDispatch } from "../../lib/comparators";

interface IMapDispatchToProps {
    loadLogs: () => void;
}

interface IMapStateToProps {
    logsAreLoading: boolean;
    logsData: Types.TAppLogs;
    logsHaveData: boolean;
}
interface ILogListProps extends IMapDispatchToProps, IMapStateToProps {
    activeLogItemId: string;
    clickHandler: (logItem: Types.ILogItem) => void;
    selectedAppLogTypes: string[];
    selectedSortOrder: string;
}

class LogList extends React.Component<ILogListProps> {
    componentDidMount() {
        const { loadLogs, logsAreLoading, logsHaveData } = this.props;

        if (!logsAreLoading && !logsHaveData) {
            loadLogs();
        }
    }

    _clickHandler(item: Types.ILogItem) {
        this.props.clickHandler(item);
    }

    _filterAndSort(): Types.ILogItem[] {
        const { logsData, selectedAppLogTypes, selectedSortOrder } = this.props;

        const [sortField, sortOrder] = selectedSortOrder.split(":");
        const comparator = comparatorDispatch(sortOrder);
        return logsData
            .filter((item: Types.ILogItem) => {
                return selectedAppLogTypes.indexOf(item.type) > -1;
            })
            .sort((a: any, b: any) => comparator(a[sortField], b[sortField]))
            .toArray();
    }

    render() {
        const {
            activeLogItemId,
            clickHandler,
            logsAreLoading,
            logsHaveData
        } = this.props;

        let loading = logsAreLoading ? <LoadingLogs /> : null;

        let list: any[] = [];
        const processedLogs = this._filterAndSort();
        processedLogs.map((item, key) => {
            list.push(
                <div key={key} onClick={this._clickHandler.bind(this, item)}>
                    <LogItem item={item} activeLogItemId={activeLogItemId} />
                </div>
            );
        });
        return (
            <div className="chc-log-list-box">
                {list}
                {loading}
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { logs } = state;
    return {
        logsAreLoading: logs.isLoading,
        logsHaveData: logs.hasData,
        logsData: logs.appLogs
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch): IMapDispatchToProps => {
    return {
        loadLogs: () => dispatch(LogsActions.loadLogs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogList);
