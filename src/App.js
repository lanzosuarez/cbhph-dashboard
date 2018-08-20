import React, { Component, Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Main from "./Main";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route exact path="/" render={() => <h1>Login</h1>} />
          <Route path="/a" component={Main} />
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
