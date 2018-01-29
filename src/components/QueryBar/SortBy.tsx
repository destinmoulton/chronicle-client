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
        name: "Newest"
    },
    { value: "createdAt:asc", name: "Oldest" }
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
    _handleOnSelect(value: string) {
        this.props.setSortOrder(value);
        this.props.sortAppLogs();
    }

    render() {
        const { order } = this.props;

        const options = OPTIONS.map(option => {
            return <Option value={option.value}>{option.name}</Option>;
        });
        return (
            <span>
                <span>Sort:</span>
                <Select defaultValue={order} size="small">
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
