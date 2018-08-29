import React from "react";
import axios from "axios";
import { API_URL, APP_NAME } from "../globals";

const CmsContext = React.createContext();

export const CmsComsumer = CmsContext.Consumer;

export function CmsConnect(params = []) {
  return function CmsConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <CmsComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </CmsComsumer>
      );
    };
  };
}

export class CmsProvider extends React.Component {
  state = {
    clients: null,
    dau: null,
    mau: null
  };

  setField = (key, val) => {
    this.setState({
      [key]: val
    });
  };

  getField = key => this.state[key];

  getClientsRq = cancelToken =>
    axios.get(`${API_URL}/cmsTraffic/clients`, {
      params: {
        client: APP_NAME
      },
      cancelToken
    });

  getDailyActiveUsers = (clientFilter = "", cancelToken) =>
    axios.get(`${API_URL}/loginAnalytics/dau`, {
      params: {
        client: APP_NAME,
        clientFilter
      },
      cancelToken
    });

  getMonthlyActiveUsers = (clientFilter = "", cancelToken) =>
    axios.get(`${API_URL}/loginAnalytics/mau`, {
      params: {
        client: APP_NAME,
        clientFilter
      },
      cancelToken
    });

  getTraffics = (
    clientFilter = "",
    filterType = "",
    filter = "",
    cancelToken
  ) =>
    axios.get(`${API_URL}/loginAnalytics/mau`, {
      params: {
        client: APP_NAME,
        filterType,
        filter,
        clientFilter
      },
      cancelToken
    });

  render() {
    return (
      <CmsContext.Provider
        value={{
          clients: this.state.clients,
          dau: this.state.dau,
          mau: this.state.mau,
          setField: this.setField,
          getField: this.getField,
          getClientsRq: this.getClientsRq,
          getDailyActiveUsers: this.getDailyActiveUsers,
          getMonthlyActiveUsers: this.getMonthlyActiveUsers,
          getTraffics: this.getTraffics
        }}
      >
        {this.props.children}
      </CmsContext.Provider>
    );
  }
}
