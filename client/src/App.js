import React, { Fragment } from "react";
import { Navigation } from "./components/layout/Navigation";
import { Base } from "./components/layout/Base";
import "./App.css";

const App = () => (
  <Fragment>
    <Navigation />
    <Base />
  </Fragment>
);

export default App;
