import * as React from "react";
import * as ReactDOM from "react-dom";
import * as _ from "lodash";

import * as Types from "../../common/types";

import Loading from "../shared/Loading";
import LogItem from "./LogItem";
import NoData from "../shared/NoData";
import SORTOPTIONS from "../../common/sortoptions.constants";
import { comparatorDispatch } from "../../lib/comparators";

import QueryBar from "./QueryBar/QueryBar";

interface IBrowserProps {
    appHasData: boolean;
    appLogs: Types.TAppLogs;
    appLogTypes: Types.TAppLogTypes;
}

interface IBrowserState {
    activeLogItem: undefined | Types.ILogItem;

    selectedAppLogTypes: string[];
    selectedSortOrder: string;
    sortedLogItems: Types.ILogItem[];
    visibleLogItems: Types.ILogItem[];
}

class Browser extends React.Component<IBrowserProps, IBrowserState> {
    // Ref for the list of items
    _refListBox: any = null;

    _numItemsToAdd = 50;
    _lastVisibleItemIndex = 0;

    constructor(props: IBrowserProps) {
        super(props);

        this.state = {
            activeLogItem: undefined,

            selectedAppLogTypes: props.appLogTypes.toArray(), // Set all log types to active
            selectedSortOrder: SORTOPTIONS[0].value,
            sortedLogItems: null,
            visibleLogItems: null
        };

        this._handleSelectLogTypes = this._handleSelectLogTypes.bind(this);
        this._handleSelectSortOrder = this._handleSelectSortOrder.bind(this);
    }

    componentDidMount() {
        this._initializeState();
    }
    componentDidUpdate(prevProps: IBrowserProps) {
        if (!prevProps.appLogTypes.equals(this.props.appLogTypes)) {
            this._initializeState();
        }
    }

    _initializeState() {
        this._lastVisibleItemIndex = 0;
        const sortedLogItems = this._filterAndSort(this.props.appLogs);
        const initialItems = sortedLogItems.slice(
            this._lastVisibleItemIndex,
            this._numItemsToAdd
        );

        this.setState({
            selectedAppLogTypes: this.props.appLogTypes.toArray(),
            sortedLogItems,
            visibleLogItems: initialItems
        });

        this._lastVisibleItemIndex =
            this._lastVisibleItemIndex + this._numItemsToAdd;
    }

    _handleSelectLogTypes(types: string[]) {
        this.setState({
            selectedAppLogTypes: types
        });
    }

    _handleSelectSortOrder(order: string) {
        this.setState({
            selectedSortOrder: order
        });
    }

    _handleClickLogItem(logItem: Types.ILogItem) {
        this.setState({
            activeLogItem: logItem
        });
    }

    _handleScrollEvent = (evt: any) => {
        const boxHeight = evt.target.clientHeight;
        const scrollHeight = evt.target.scrollHeight;
        const scrollTop = evt.target.scrollTop;

        const relHeight = scrollHeight - boxHeight;
        const scrollDiff = relHeight - scrollTop;

        if (scrollDiff < boxHeight) {
            const { sortedLogItems, visibleLogItems } = this.state;
            if (this._lastVisibleItemIndex < sortedLogItems.length) {
                const newEndIndex =
                    this._lastVisibleItemIndex + this._numItemsToAdd;
                const additionalItems = sortedLogItems.slice(
                    this._lastVisibleItemIndex,
                    newEndIndex
                );
                this._lastVisibleItemIndex = newEndIndex;
                const fullSet = [...visibleLogItems, ...additionalItems];
                this.setState({
                    visibleLogItems: fullSet
                });
            }
        }
    };

    _initRefListBox = (el: HTMLDivElement) => {
        if (this._refListBox === null) {
            const elem = ReactDOM.findDOMNode(el);
            if (elem) {
                this._refListBox = el;
                elem.addEventListener(
                    "scroll",
                    _.debounce(this._handleScrollEvent, 100)
                );
            }
        }
    };

    _filterAndSort(logItems: Types.TAppLogs): Types.ILogItem[] {
        const { selectedAppLogTypes, selectedSortOrder } = this.state;

        const [sortField, sortOrder] = selectedSortOrder.split(":");
        const comparator = comparatorDispatch(sortOrder);
        return logItems
            .filter((item: Types.ILogItem) => {
                return selectedAppLogTypes.indexOf(item.type) > -1;
            })
            .sort((a: any, b: any) => comparator(a[sortField], b[sortField]))
            .toArray();
    }

    _buildList() {
        const { activeLogItem, sortedLogItems, visibleLogItems } = this.state;
        const activeLogItemId =
            activeLogItem !== undefined ? activeLogItem.id : "";
        let list: any[] = [];
        if (visibleLogItems) {
            visibleLogItems.map((item, key) => {
                list.push(
                    <div
                        key={key}
                        onClick={this._handleClickLogItem.bind(this, item)}
                    >
                        <LogItem
                            item={item}
                            activeLogItemId={activeLogItemId}
                        />
                    </div>
                );
            });
        }
        if (
            sortedLogItems &&
            this._lastVisibleItemIndex < sortedLogItems.length
        ) {
            list.push(<Loading key="loading" />);
        }
        return list;
    }

    render() {
        const { appHasData, appLogTypes } = this.props;
        const {
            selectedAppLogTypes,
            selectedSortOrder,
            visibleLogItems
        } = this.state;

        const list = this._buildList();

        let content = [<Loading key="loading" />];

        if (appHasData && visibleLogItems && visibleLogItems.length === 0) {
            content = [<NoData key="nodata" />];
        } else if (visibleLogItems && visibleLogItems.length > 0) {
            content = [
                <QueryBar
                    key="querybar"
                    appLogTypes={appLogTypes}
                    onSelectLogTypes={this._handleSelectLogTypes}
                    selectedAppLogTypes={selectedAppLogTypes}
                    onSelectSortOrder={this._handleSelectSortOrder}
                    selectedSortOrder={selectedSortOrder}
                />,
                <div
                    key="Browser"
                    className="chc-log-list-box"
                    ref={el => this._initRefListBox(el)}
                >
                    {list}
                </div>
            ];
        }
        return content;
    }
}

export default Browser;
