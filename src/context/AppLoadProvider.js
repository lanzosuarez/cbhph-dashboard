import React from "react";

const AppLoadingContext = React.createContext();

export const AppLoadingComsumer = AppLoadingContext.Consumer;

export function AppLoadingConnect(params = []) {
  return function AppLoadingConnectedComponent(Component) {
    return function ConnectedComponentParameter(props) {
      return (
        <AppLoadingComsumer>
          {state => {
            let requestedState = {};
            params.forEach(param => {
              if (state[param] !== undefined) {
                requestedState[param] = state[param];
              }
            });
            return <Component {...props} {...requestedState} />;
          }}
        </AppLoadingComsumer>
      );
    };
  };
}

export class AppLoadingProvider extends React.Component {
  state = {
    loadCount: 0
  };

  addCount = () => {
    const loadCount = this.state.loadCount + 1;
    this.setState({ loadCount });
  };

  minusCount = () => {
    if (this.state.loadCount > 0) {
      const loadCount = this.state.loadCount - 1;
      this.setState({ loadCount });
    }
  };

  render() {
    return (
      <AppLoadingContext.Provider
        value={{
          loadCount: this.state.loadCount,
          addCount: this.sat
        }}
      >
        {this.props.children}
      </AppLoadingContext.Provider>
    );
  }
}
