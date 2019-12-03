import React, { Component } from "react";
import EmployeeConnector from "./connectors/EmployeeConnector";
import EmployeeListConnector from "./connectors/EmployeeListConnector";
import { HashRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/" render={() => <EmployeeListConnector />} />
            <Route path="/:id" render={() => <EmployeeConnector />} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
