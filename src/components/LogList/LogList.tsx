import * as React from "react";
import { connect } from "react-redux";

import * as Types from "../../common/types";

import Loading from "../shared/Loading";
import LogItem from "./LogItem";
import NoData from "../shared/NoData";
import SORTOPTIONS from "../../common/sortoptions.constants";
import { comparatorDispatch } from "../../lib/comparators";

import QueryBar from "./QueryBar/QueryBar";

interface ILogListProps {
    appHasData: boolean;
    appLogs: Types.TAppLogs;
    appLogTypes: Types.TAppLogTypes;
}

interface ILogListState {
    _activeLogItem: undefined | Types.ILogItem;
    _selectedAppLogTypes: string[];
    _selectedSortOrder: string;
}

class LogList extends React.Component<ILogListProps, ILogListState> {
    constructor(props: ILogListProps) {
        super(props);

        this.state = {
            _activeLogItem: undefined,
            _selectedAppLogTypes: props.appLogTypes.toArray(), // Set all log types to active
            _selectedSortOrder: SORTOPTIONS[0].value
        };

        this._handleSelectLogTypes = this._handleSelectLogTypes.bind(this);
        this._handleSelectSortOrder = this._handleSelectSortOrder.bind(this);
    }

    componentWillReceiveProps(nextProps: ILogListProps) {
        this.setState({
            _selectedAppLogTypes: nextProps.appLogTypes.toArray() // Set all log types to active
        });
    }

    _filterAndSort(): Types.ILogItem[] {
        const { appLogs } = this.props;
        const { _selectedAppLogTypes, _selectedSortOrder } = this.state;

        const [sortField, sortOrder] = _selectedSortOrder.split(":");
        const comparator = comparatorDispatch(sortOrder);
        return appLogs
            .filter((item: Types.ILogItem) => {
                return _selectedAppLogTypes.indexOf(item.type) > -1;
            })
            .sort((a: any, b: any) => comparator(a[sortField], b[sortField]))
            .toArray();
    }

    _handleSelectLogTypes(types: string[]) {
        this.setState({
            _selectedAppLogTypes: types
        });
    }

    _handleSelectSortOrder(order: string) {
        this.setState({
            _selectedSortOrder: order
        });
    }

    _handleClickLogItem(logItem: Types.ILogItem) {
        this.setState({
            _activeLogItem: logItem
        });
    }

    render() {
        const { appHasData, appLogTypes } = this.props;
        const {
            _activeLogItem,
            _selectedAppLogTypes,
            _selectedSortOrder
        } = this.state;

        const activeLogItemId =
            _activeLogItem !== undefined ? _activeLogItem.id : "";

        let list: any[] = [];
        const processedLogs = this._filterAndSort();
        processedLogs.map((item, key) => {
            list.push(
                <div
                    key={key}
                    onClick={this._handleClickLogItem.bind(this, item)}
                >
                    <LogItem item={item} activeLogItemId={activeLogItemId} />
                </div>
            );
        });

        let content = [<Loading key="loading" />];

        if (appHasData && appLogTypes.size === 0) {
            content = [<NoData key="nodata" />];
        } else if (appLogTypes.size > 0) {
            content = [
                <QueryBar
                    appLogTypes={appLogTypes}
                    onSelectLogTypes={this._handleSelectLogTypes}
                    selectedAppLogTypes={_selectedAppLogTypes}
                    onSelectSortOrder={this._handleSelectSortOrder}
                    selectedSortOrder={_selectedSortOrder}
                />,
                <div className="chc-log-list-box">{list}</div>
            ];
        }
        return content;
    }
}

export default LogList;
