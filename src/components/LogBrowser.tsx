import * as React from "react";

import { Row, Col } from "antd";

import LogList from "./LogList/LogList";

const LogBrowser: React.SFC = props => (
    <Row>
        <Col span={4}>
            <LogList />
        </Col>
        <Col span={20}>Main Content</Col>
    </Row>
);

export default LogBrowser;
