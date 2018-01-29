import * as React from "react";
import { connect } from "react-redux";
import { Moment } from "moment";

import { DatePicker } from "antd";

interface IMapDispatchToProps {}
interface IMapStateToProps {}

interface IDateRangeProps extends IMapDispatchToProps, IMapStateToProps {}

class DateRange extends React.Component<IDateRangeProps> {
    constructor(props: IDateRangeProps) {
        super(props);

        this._handleSelectStartDate = this._handleSelectStartDate.bind(this);
        this._handleSelectEndDate = this._handleSelectEndDate.bind(this);
    }

    _handleSelectStartDate(date: Moment, dateString: string) {
        console.log(date, dateString);
    }

    _handleSelectEndDate(date: Moment, dateString: string) {
        console.log(date, dateString);
    }

    render() {
        return (
            <div className="chc-nav-date-range">
                <DatePicker
                    onChange={this._handleSelectStartDate}
                    placeholder="Start Date"
                    size="small"
                />

                <DatePicker
                    onChange={this._handleSelectEndDate}
                    placeholder="End Date"
                    size="small"
                />
            </div>
        );
    }
}

export default connect()(DateRange);
