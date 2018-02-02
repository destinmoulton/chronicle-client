import * as React from "react";
import { connect } from "react-redux";

import * as Types from "../../common/types";

import LogItem from "./LogItem";

import { comparatorDispatch } from "../../lib/comparators";

interface ILogListProps {
    activeLogItemId: string;
    appLogs: Types.TAppLogs;
    clickHandler: (logItem: Types.ILogItem) => void;
    selectedAppLogTypes: string[];
    selectedSortOrder: string;
}

class LogList extends React.Component<ILogListProps> {
    _clickHandler(item: Types.ILogItem) {
        this.props.clickHandler(item);
    }

    _filterAndSort(): Types.ILogItem[] {
        const { appLogs, selectedAppLogTypes, selectedSortOrder } = this.props;

        const [sortField, sortOrder] = selectedSortOrder.split(":");
        const comparator = comparatorDispatch(sortOrder);
        return appLogs
            .filter((item: Types.ILogItem) => {
                return selectedAppLogTypes.indexOf(item.type) > -1;
            })
            .sort((a: any, b: any) => comparator(a[sortField], b[sortField]))
            .toArray();
    }

    render() {
        const { activeLogItemId, clickHandler } = this.props;

        let list: any[] = [];
        const processedLogs = this._filterAndSort();
        processedLogs.map((item, key) => {
            list.push(
                <div key={key} onClick={this._clickHandler.bind(this, item)}>
                    <LogItem item={item} activeLogItemId={activeLogItemId} />
                </div>
            );
        });
        return <div className="chc-log-list-box">{list}</div>;
    }
}

export default LogList;
