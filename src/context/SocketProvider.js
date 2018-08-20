import React from "react";

const SocketContext = React.createContext();

export const SocketComsumer = SocketContext.Consumer;

export function SocketConnect(params = []) {
  return function SocketConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <SocketComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </SocketComsumer>
      );
    };
  };
}

export class SocketProvider extends React.Component {
  state = {
    socket: null
  };

  setSocket = socket => {
    console.log("Socket set", socket);
    this.setState({ socket });
  };
  getSocket = () => this.state.socket;

  render() {
    return (
      <SocketContext.Provider
        value={{
          socket: this.state.socket,
          setSocket: this.setSocket,
          getSocket: this.getSocket
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}
