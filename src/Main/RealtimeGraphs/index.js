import React, { Component } from "react";

import { Row, Col } from "antd";

import CMSActivities from "./CMSActivities";
import AppSocket from "../../socket";
import { SOCKET_EVENTS, CMS_ACTIVITIES } from "../../globals";

let defaultData = [
  { name: "12am" },
  { name: "1am" },
  { name: "2am" },
  { name: "3am" },
  { name: "4am" },
  { name: "5am" },
  { name: "6am" },
  { name: "7am" },
  { name: "8am" },
  { name: "9am" },
  { name: "10am" },
  { name: "11am" },
  { name: "12pm" },
  { name: "1pm" },
  { name: "2pm" },
  { name: "3pm" },
  { name: "4pm" },
  { name: "5pm" },
  { name: "6pm" },
  { name: "7pm" },
  { name: "8pm" },
  { name: "9pm" },
  { name: "10pm" },
  { name: "11pm" }
];

CMS_ACTIVITIES.forEach(act => {
  defaultData.forEach((d, index) => {
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
