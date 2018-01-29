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

    _handleSelectStartDate(date: Moment, dateString: string) {
        this.props.setQueryDateStart(date);
    }

    _handleSelectEndDate(date: Moment, dateString: string) {
        this.props.setQueryDateEnd(date);
    }

    render() {
        const { rangeDateEnd, rangeDateStart } = this.props;
        return (
            <span className="chc-query-date-range">
                <DatePicker
                    onChange={this._handleSelectStartDate}
                    placeholder="Start Date"
                    size="small"
                    format={DATE_FORMAT}
                    defaultValue={rangeDateStart}
                />
                <span>&nbsp;to&nbsp;</span>
                <DatePicker
                    onChange={this._handleSelectEndDate}
                    placeholder="End Date"
                    size="small"
                    format={DATE_FORMAT}
                    defaultValue={rangeDateEnd}
                />
            </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(DateRange);
