import React from "react";
import ReactDOM from "react-dom";

/* Main entry of the application */
import App from "pages";

/* Not necessary yet */
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

/* Global css overrides */
import "./index.scss";

/* Mount our application */
ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.unregister();

reportWebVitals();
