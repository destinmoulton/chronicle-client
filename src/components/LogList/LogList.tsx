import * as React from "react";
import { connect } from "react-redux";

import * as Types from "../../common/types";

import * as LogsActions from "../../redux/actions/logs.actions";

import LoadingLogs from "./LoadingLogs";
import LogItem from "./LogItem";

interface IMapDispatchToProps {
    loadLogs: () => void;
}

interface IMapStateToProps {
    logsAreLoading: boolean;
    logsData: Types.IAppLogs;
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
        const { logsAreLoading, logsData, logsHaveData } = this.props;

        let loading = logsAreLoading ? <LoadingLogs /> : null;

        let list: any[] = [];
        logsData.map((item, key) => {
            list.push(<LogItem key={key} item={item} />);
        });
        return (
            <div>
                {list}
                {loading}
            </div>
        );
    }
}

const mapStateToProps = (state: Types.IRootStoreState): IMapStateToProps => {
    const { logs } = state;
    return {
        logsAreLoading: logs.isLoading,
        logsHaveData: logs.hasData,
        logsData: logs.appLogs
    };
};

const mapDispatchToProps = (dispatch: Types.IDispatch): IMapDispatchToProps => {
    return {
        loadLogs: () => dispatch(LogsActions.loadLogs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogList);
