import * as React from "react";
import { connect } from "react-redux";

import * as Types from "../../common/types";

import * as LogsActions from "../../redux/actions/logs.actions";

import LoadingLogs from "./LoadingLogs";

interface IMapDispatchToProps {
    loadLogs: () => void;
}

interface IMapStateToProps {
    logsAreLoading: boolean;
    logsHaveData: boolean;
}
interface ILogListProps extends IMapDispatchToProps, IMapStateToProps {}

class LogList extends React.Component<ILogListProps> {
    componentDidMount() {
        const { loadLogs, logsAreLoading, logsHaveData } = this.props;

        if (!logsAreLoading && !logsHaveData) {
            loadLogs();
        }
    }

    render() {
        const { logsAreLoading, logsHaveData } = this.props;

        let loading = logsAreLoading ? <LoadingLogs /> : null;

        return loading;
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { logs } = state;
    return {
        logsAreLoading: logs.isLoading,
        logsHaveData: logs.hasData
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch): IMapDispatchToProps => {
    return {
        loadLogs: () => dispatch(LogsActions.loadLogs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogList);
