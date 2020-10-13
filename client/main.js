import React from "react";
import { hydrate } from "react-dom";
import App from "./App";
import "./assets/scss/main.css";
hydrate(<App />, document.getElementById("root"));
