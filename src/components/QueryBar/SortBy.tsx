import * as React from "react";
import { connect } from "react-redux";
import { Select } from "antd";
const Option = Select.Option;

import * as Types from "../../common/types";
import { setSortOrder } from "../../redux/actions/sort.actions";
import { sortAppLogs } from "../../redux/actions/logs.actions";

const OPTIONS = [
    {
        value: "createdAt:desc",
        name: "Newest First"
    },
    { value: "createdAt:asc", name: "Oldest First" }
];
interface IMapDispatchToProps {
    setSortOrder: (newOrder: string) => void;
    sortAppLogs: () => void;
}
interface IMapStateToProps {
    order: string;
}
interface ISortByProps extends IMapDispatchToProps, IMapStateToProps {}
class SortBy extends React.Component<ISortByProps> {
    constructor(props: ISortByProps) {
        super(props);

        this._handleOnSelect = this._handleOnSelect.bind(this);
    }
    _handleOnSelect(value: string) {
        this.props.setSortOrder(value);
        this.props.sortAppLogs();
    }

    render() {
        const { order } = this.props;

        const options = OPTIONS.map(option => {
            return (
                <Option key={option.value} value={option.value}>
                    {option.name}
                </Option>
            );
        });
        return (
            <span>
                <span>Sort:</span>
                <Select
                    defaultValue={order}
                    size="small"
                    onChange={this._handleOnSelect}
                >
                    {options}
                </Select>
            </span>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState) => {
    const { sort } = state;
    return {
        order: sort.order
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch) => {
    return {
        setSortOrder: (newSortOrder: string) =>
            dispatch(setSortOrder(newSortOrder)),
        sortAppLogs: () => dispatch(sortAppLogs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);
