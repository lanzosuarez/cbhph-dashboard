import React, { Component } from "react";

import { Row, Col } from "antd";

import CMSActivities from "./CMSActivities";
import AppSocket from "../../socket";
import { SOCKET_EVENTS, CMS_ACTIVITIES, DEFAULT_DAY } from "../../globals";

const defaultData = [...DEFAULT_DAY];

CMS_ACTIVITIES.forEach(act => {
  DEFAULT_DAY.forEach((d, index) => {
    d[act] = 0;
    defaultData.splice(index, 1, d);
  });
});

export class RealtimeGraphs extends Component {
  state = { data: defaultData };

  componentDidMount() {
    AppSocket.subscribeToEvent(SOCKET_EVENTS.CMS.TRAFFIC, data => {
      const componentData = this.state.data;
      data.forEach((d, index) => {
        let cData = componentData[index];
        Object.keys(d).forEach(key => {
          cData[key] = d[key];
        });
        componentData.splice(index, 1, cData);
      });
      console.log(componentData);
      this.setState({ data: componentData });
    });
  }

  render() {
    return (
      <Row>
        <Col xl={12}>
          <CMSActivities data={this.state.data} />
        </Col>
      </Row>
    );
  }
}

export default RealtimeGraphs;
