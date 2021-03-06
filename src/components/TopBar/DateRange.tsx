import * as React from "react";
import { connect } from "react-redux";
import { Moment } from "moment";

import { DatePicker } from "antd";

import * as Types from "../../common/types";
import { DATE_FORMAT } from "../../common/date.constants";

import {
    setQueryDateEnd,
    setQueryDateStart
} from "../../redux/actions/query.actions";

interface IMapDispatchToProps {
    setQueryDateEnd: (dateMoment: Moment) => void;
    setQueryDateStart: (dateMoment: Moment) => void;
}
interface IMapStateToProps {
    rangeDateEnd: Moment;
    rangeDateStart: Moment;
}

interface IDateRangeProps extends IMapDispatchToProps, IMapStateToProps {}

class DateRange extends React.Component<IDateRangeProps> {
    constructor(props: IDateRangeProps) {
        super(props);

        this._handleSelectStartDate = this._handleSelectStartDate.bind(this);
        this._handleSelectEndDate = this._handleSelectEndDate.bind(this);
    }

    _handleSelectStartDate(date: Moment) {
        this.props.setQueryDateStart(date);
    }

    _handleSelectEndDate(date: Moment) {
        this.props.setQueryDateEnd(date);
    }

    render() {
        const { rangeDateEnd, rangeDateStart } = this.props;
        return (
            <div className="chc-topbar-daterange-box">
                <span>Query Dates:&nbsp;</span>
                <DatePicker
                    onChange={this._handleSelectStartDate}
                    placeholder="Start Date"
                    size="small"
                    format={DATE_FORMAT}
                    defaultValue={rangeDateStart}
                    style={{ width: "110px" }}
                />
                <span>&nbsp;to&nbsp;</span>
                <DatePicker
                    onChange={this._handleSelectEndDate}
                    placeholder="End Date"
                    size="small"
                    format={DATE_FORMAT}
                    defaultValue={rangeDateEnd}
                    style={{ width: "110px" }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState) => {
    const { query } = state;

    return {
        rangeDateEnd: query.dateRangeEnd,
        rangeDateStart: query.dateRangeStart
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch) => {
    return {
        setQueryDateEnd: (dateMoment: Moment) =>
            dispatch(setQueryDateEnd(dateMoment)),
        setQueryDateStart: (dateMoment: Moment) =>
            dispatch(setQueryDateStart(dateMoment))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DateRange);
