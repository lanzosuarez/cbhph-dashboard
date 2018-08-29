import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./socket";
import { CmsProvider } from "./context/CmsProvider";
import { AppLoadingProvider } from "./context/AppLoadProvider";

ReactDOM.render(
  <AppLoadingProvider>
    <CmsProvider>
      <App />
    </CmsProvider>
  </AppLoadingProvider>,
  document.getElementById("root")
);

registerServiceWorker();
