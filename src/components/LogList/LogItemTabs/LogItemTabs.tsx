import * as React from "react";

import { Tabs } from "antd";
const TabPane = Tabs.TabPane;
import * as Types from "../../../common/types";

import DataTab from "./DataTab";
import TraceTab from "./TraceTab";
import RawTab from "./RawTab";
import UserTab from "./UserTab";

interface IProps {
    item: Types.ILogItem;
}

class LogItemTabs extends React.Component<IProps> {
    state = {
        activeTab: "data"
    };

    _handleActivateTab = (tabName: string) => {
        this.setState({
            activeTab: tabName
        });
    };

    render() {
        const { item } = this.props;
        const { activeTab } = this.state;
        return (
            <div className="chc-log-item-tabs-container">
                <Tabs
                    defaultActiveKey={activeTab}
                    onChange={this._handleActivateTab}
                    type="card"
                >
                    <TabPane tab="Data" key="data">
                        <DataTab item={item} />
                    </TabPane>
                    <TabPane tab="User" key="user">
                        <UserTab item={item} />
                    </TabPane>
                    <TabPane tab="Trace" key="trace">
                        <TraceTab item={item} />
                    </TabPane>
                    <TabPane tab="Raw" key="raw">
                        <RawTab item={item} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default LogItemTabs;
