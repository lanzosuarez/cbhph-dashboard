import React from "react";
import { Card, Row, Col, Icon } from "antd";

export default ({ title, bg, value, font, icon }) => (
  <Card style={{ background: bg, borderRadius: 5 }}>
    <Row>
      <Col xl={18}>
        <h1 style={{ marginBottom: 0, color: font }}>{value}</h1>
        <h5 style={{ color: font }}>{title}</h5>
      </Col>
      <Col xl={6}>
        <Icon style={{ color: font, fontSize: 45 }} type={icon} />
      </Col>
    </Row>
  </Card>
);
