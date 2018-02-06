import * as React from "react";
import { connect } from "react-redux";

import { Button } from "antd";

import * as Types from "../../../common/types";

import { loadLogs } from "../../../redux/actions/logs.actions";

interface IMapStateToProps {}

interface IMapDispatchToProps {
    loadLogs: () => void;
}
interface IRefreshButtonProps extends IMapStateToProps, IMapDispatchToProps {}

class RefreshButton extends React.Component<IRefreshButtonProps> {
    constructor(props: IRefreshButtonProps) {
        super(props);

        this._handlePressReload = this._handlePressReload.bind(this);
    }

    _handlePressReload() {
        this.props.loadLogs();
    }

    render() {
        return (
            <Button
                shape="circle"
                icon="reload"
                size="small"
                onClick={this._handlePressReload}
            />
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    return {};
};

const mapDispatchToProps = (dispatch: Types.IDispatch): IMapDispatchToProps => {
    return {
        loadLogs: () => dispatch(loadLogs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RefreshButton);
