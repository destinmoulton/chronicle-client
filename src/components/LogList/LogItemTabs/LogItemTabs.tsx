import * as React from "react";

import { Tabs } from "antd";
const TabPane = Tabs.TabPane;
import * as Types from "../../../common/types";

import DataTab from "./DataTab";
import TraceTab from "./TraceTab";
import FullTab from "./FullTab";

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
            <div>
                <Tabs
                    defaultActiveKey={activeTab}
                    onChange={this._handleActivateTab}
                >
                    <TabPane tab="Data" key="data">
                        <DataTab item={item} />
                    </TabPane>
                    <TabPane tab="Trace" key="trace">
                        <TraceTab item={item} />
                    </TabPane>
                    <TabPane tab="Full" key="full">
                        <FullTab item={item} />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default LogItemTabs;
