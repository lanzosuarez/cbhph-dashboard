import React, { Component } from "react";
import { Layout, Menu, Icon, notification } from "antd";
import AppSocket from "../socket";
import { SOCKET_EVENTS } from "../globals";

import { Route, Switch } from "react-router-dom";

import RealTimeGraphs from "./RealtimeGraphs";
import Cms from "./Cms";
import AppLoading from "./AppLoading";
import { AppLoadingComsumer } from "../context/AppLoadProvider";

const { Header, Content, Footer, Sider } = Layout;

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

  menuSelect = ({ item, key, selectedKeys }) => {
    this.props.history.push(key);
  };

  render() {
    const { pathname } = this.props.location;
    return (
      <AppLoadingComsumer>
        {({ loadCount }) => {
          return loadCount > 0 ? (
            <AppLoading />
          ) : (
            <Layout style={{ minHeight: "100vh" }}>
              <Header className="elevation" style={{ background: "white" }}>
                <div className="logo" />
              </Header>
              <Layout>
                <Sider
                  breakpoint="xxl"
                  collapsible
                  collapsed={this.state.collapsed}
                  onCollapse={this.onCollapse}
                  width={200}
                >
                  <Menu
                    onSelect={this.menuSelect}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    style={{ height: "100%", borderRight: 0 }}
                  >
                    <Menu.Item key="/a">
                      <Icon type="pie-chart" />
                      <span>Realtime Data</span>
                    </Menu.Item>
                    <Menu.Item key="/a/cms">
                      <Icon type="pie-chart" />
                      <span>CMS</span>
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Layout style={{ padding: "0 24px 24px", background: "#ededef" }}>
                  <Content
                    style={{
                      padding: 17,
                      paddingBottom: 0,
                      paddingTop: 30,
                      margin: 0,
                      minHeight: 360
                    }}
                  >
                    <Switch>
                      <Route exact path="/a" component={RealTimeGraphs} />
                      <Route path="/a/cms" component={Cms} />
                    </Switch>
                  </Content>
                  {/* <Footer style={{ textAlign: "center", padding: 0 }}>
                    CBPH Dashboard ©{new Date().getFullYear()} Created by
                    ChatbotPH
                  </Footer> */}
                </Layout>
              </Layout>
            </Layout>
          );
        }}
      </AppLoadingComsumer>
    );
  }
}

export default Main;

// <Layout style={{ minHeight: "100vh" }}>
//     <Header style={{ background: "#fff", padding: 0 }} />
//     <div className="logo" />
//   <Sider
//     style={{ backgroundColor: "white" }}
//     breakpoint="xxl"
//     collapsible
//     collapsed={this.state.collapsed}
//     onCollapse={this.onCollapse}
//   >
//     <Menu

//       theme="light"
//       defaultSelectedKeys={["1"]}
//       mode="inline">
//       <Menu.Item key="1">
//         <Icon type="pie-chart" />
//         <span>Realtime Data</span>
//       </Menu.Item>
//       {/* <Menu.Item key="2">
//         <Icon type="desktop" />
//         <span>CMS Analytics</span>
//       </Menu.Item> */}
//       <SubMenu
//         key="sub1"
//         title={
//           <span>
//             <Icon type="desktop" />
//             <span>Analytics</span>
//           </span>
//         }
//       >
//         <Menu.Item key="3">CMS</Menu.Item>
//       </SubMenu>
//       <SubMenu
//         key="sub2"
//         title={
//           <span>
//             <Icon type="team" />
//             <span>Team</span>
//           </span>
//         }
//       >
//         <Menu.Item key="6">Team 1</Menu.Item>
//         <Menu.Item key="8">Team 2</Menu.Item>
//       </SubMenu>
//       {/* <Menu.Item key="9">
//         <Icon type="file" />
//         <span>File</span>
//       </Menu.Item> */}
//     </Menu>
//   </Sider>
//   <Layout>
//     <Content style={{ margin: "0 16px" }}>
//       <div
//         style={{
//           margin: "16px 0",
//           padding: 24,

//           minHeight: 360
//         }}
//       >
//         <Route exact path="/a" component={RealTimeGraphs} />
//       </div>
//     </Content>
//     <Footer style={{ textAlign: "center" }}>
//       CBPH Dashboard ©{new Date().getFullYear()} Created by ChatbotPH
//     </Footer>
//   </Layout>
// </Layout>
