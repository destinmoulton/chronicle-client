import * as React from "react";

import * as Types from "../../../common/types";

interface IProps {
    item: Types.ILogItem;
}

const UserTab = (props: IProps) => {
    const { item } = props;

    let clientOut = [];

    const client = item.client;
    const clientKeys = Object.keys(client);
    clientOut = clientKeys.map(key => {
        if (client[key] !== null) {
            return (
                <div key={key} className="chc-log-item-tab-user-line">
                    <span className="chc-log-item-tab-user-key">{key}</span>
                    <span>:&nbsp;&nbsp;</span>
                    <span className="chc-log-item-tab-user-value">
                        {client[key].toString()}
                    </span>
                </div>
            );
        }
    });
    return (
        <div>
            <div className="chc-log-item-tab-contents">{clientOut}</div>
        </div>
    );
};

export default UserTab;
