import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/layout/Navigation";
import { Base } from "./components/layout/Base";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Navigation />
      <Routes>
      <Route exact path='/' element={<Base/>} />
      <Route exact path='/register' element={<Register/>} />
      <Route exact path='/login' element={<Login/>} />
      </Routes>
    </Fragment>
  </Router>
);

export default App;
