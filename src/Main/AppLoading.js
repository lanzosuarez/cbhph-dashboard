import React from "react";

import { Row, Spin } from "antd";

export default props => (
  <Row style={{ minHeight: 300 }} justify="center" align="middle" type="flex">
    <Spin size="large" />
  </Row>
);
