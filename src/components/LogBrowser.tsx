import * as React from "react";

import { Row, Col } from "antd";

class LogBrowser extends React.Component {
    render() {
        return (
            <Row>
                <Col span={4}>Menu</Col>
                <Col span={20}>Main Content</Col>
            </Row>
        );
    }
}

export default LogBrowser;
