import * as React from "react";
import { Icon } from "antd";
interface ILoadingProps {}
const Loading: React.SFC<ILoadingProps> = (props: ILoadingProps) => {
    return (
        <div className="chc-loading-animation">
            <Icon type="loading" />
        </div>
    );
};

export default Loading;
