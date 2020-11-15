import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CurrentUserProvider } from "./components/CurrentUserContext";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>,
  rootElement
);
