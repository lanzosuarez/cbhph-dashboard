import React, { Component } from "react";
import { Layout, Menu, Icon, notification } from "antd";
import AppSocket from "../socket";
import { SOCKET_EVENTS } from "../globals";

import { Route } from "react-router-dom";

import RealTimeGraphs from "./RealtimeGraphs";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Main extends Component {
  state = {
    collapsed: false
  };

  componentDidMount() {
    this.setUpSocket();
  }

  openNotificationWithIcon = (type, message, description) => {
    notification.config({
      duration: 2
    });
    notification[type]({
      message,
      description,
      style: {
        fontSize: 14
      }
    });
  };

  setUpSocket = () => {
    //connect to soocket
    const { CONNECT } = SOCKET_EVENTS;
    AppSocket.emitEvent(CONNECT);

    AppSocket.socket.on("connect", () => {
      this.openNotificationWithIcon(
        "success",
        "Connected",
        "Successfully connected to server"
      );
    });
    AppSocket.socket.on("disconnect", () => {
      console.log("disconnected");
      this.openNotificationWithIcon(
        "error",
        "Disconnected",
        "You have been from the server"
      );
    });
    AppSocket.socket.on("error", () => {
      this.openNotificationWithIcon(
        "error",
        " Disconnected",
        "You have been from the server"
      );
    });
    AppSocket.socket.on("reconnecting", attemptNumber => {
      this.openNotificationWithIcon(
        "info",
        "Started reconnecting to server",
        `Attempt ${attemptNumber}`
      );
    });
    AppSocket.socket.on("reconnect", attemptNumber => {
      this.openNotificationWithIcon(
        "success",
        "Successfully reconnected to the server",
        `Attempt number ${attemptNumber} `
      );
      AppSocket.forceJoin();
    });
  };

  onCollapse = (navCollapsed, type) => {
    if (type === "responsive") {
      this.setState({ collapsed: navCollapsed });
    }
    if (type === "clickTrigger") {
      console.log(navCollapsed);
      this.setState({ collapsed: !this.state.collapsed });
    }
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="xxl"
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Realtime Data</span>
            </Menu.Item>
            {/* <Menu.Item key="2">
              <Icon type="desktop" />
              <span>CMS Analytics</span>
            </Menu.Item> */}
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="desktop" />
                  <span>Analytics</span>
                </span>
              }
            >
              <Menu.Item key="3">CMS</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            {/* <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            <div
              style={{
                margin: "16px 0",
                padding: 24,
                background: "#fff",
                minHeight: 360
              }}
            >
              <Route exact path="/a" component={RealTimeGraphs} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            CBPH Dashboard ©{new Date().getFullYear()} Created by ChatbotPH
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Main;
