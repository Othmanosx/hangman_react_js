import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";
export const initGA = () => {
  ReactGA.initialize("G-H5MNH7FL0S");
};

ReactDOM.render(
  <React.StrictMode>
    <App initGA={initGA} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
