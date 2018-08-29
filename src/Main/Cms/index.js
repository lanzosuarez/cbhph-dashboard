import React, { Component, Fragment } from "react";
import { Row, Col, Select } from "antd";
import { CmsConnect, CmsComsumer } from "../../context/CmsProvider";
import axios from "axios";

import AppLoading from "../AppLoading";
import StatCardList from "./StatCardlist";
import StatGraph from "./StatGraph";

const CancelToken = axios.CancelToken;

const Option = Select.Option;

class Cms extends Component {
  state = {
    loading: false,
    selectedClient: ""
  };

  getClientToken = CancelToken.source();
  getDauToken = CancelToken.source();
  getMauToken = CancelToken.source();

  toggleLoad = () => this.setState({ loading: !this.state.loading });

  async componentDidMount() {
    try {
      this.toggleLoad();
      await Promise.all([
        this.getCmsClients(),
        this.getDailyUsers(),
        this.getMonthlyUsers()
      ]);
      this.toggleLoad();
    } catch (error) {
      this.toggleLoad();
    }
  }

  componentWillUnmount() {
    this.getClientToken.cancel();
    this.getDauToken.cancel();
    this.getMauToken.cancel();
  }

  getMonthlyUsers = async () => {
    try {
      const { selectedClient } = this.state;
      const { getMonthlyActiveUsers, setField } = this.props;
      const res = await getMonthlyActiveUsers(
        selectedClient,
        this.getMauToken.token
      );
      console.log(res);
      const { data } = res.data;
      setField("mau", data);
    } catch (error) {}
  };

  getDailyUsers = async () => {
    try {
      const { selectedClient } = this.state;
      const { getDailyActiveUsers, setField } = this.props;
      const res = await getDailyActiveUsers(
        selectedClient,
        this.getDauToken.token
      );
      console.log(res);
      const { data } = res.data;
      setField("dau", data);
    } catch (error) {}
  };

  getCmsClients = async () => {
    try {
      const { getClientsRq, setField } = this.props;
      const res = await getClientsRq(this.getClientToken.token);
      const { data } = res.data;
      setField("clients", data);
    } catch (error) {}
  };

  selectClient = selectedClient => this.setState({ selectedClient });

  render() {
    const clients = this.props.clients || [];
    const { loading } = this.state;
    return (
      <Row>
        {loading ? (
          <AppLoading />
        ) : (
          <Fragment>
            <Col xl={24}>
              <Select
                defaultValue=""
                style={{
                  width: 180
                }}
                onChange={this.selectClient}
              >
                <Option value="">All Clients</Option>
                {clients.map(client => (
                  <Option key={client} value={client}>
                    {client}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col style={{ paddingTop: 20, paddingBottom: 20 }} xl={24}>
              <CmsComsumer>
                {({ dau, mau }) => <StatCardList mau={mau} dau={dau} />}
              </CmsComsumer>
            </Col>
            <Col xl={24}>
              <Row gutter={16}>
                <Col xl={12}>
                  <StatGraph />
                </Col>
                <Col>
                  <h2>Errors</h2>
                </Col>
              </Row>
            </Col>
          </Fragment>
        )}
      </Row>
    );
  }
}

export default CmsConnect([
  "clients",
  "getClientsRq",
  "setField",
  "getDailyActiveUsers",
  "getMonthlyActiveUsers"
])(Cms);
