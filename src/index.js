import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles.scss";
import Form from "./components/Form";
import Guest from "./components/Guest";
import Banner from "./components/Banner";
import Affiliate from "./components/Affiliate";
import PreviousVisits from "./components/PreviousVisits"

ReactDOM.render(
  <React.StrictMode>
    <div id="wrapper" role="main">
      <Banner />
      <div className="container mt-3">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Form} />
            <Route exact path="/admin/guests" component={Guest} />
            <Route exact path="/admin/affiliates" component={Affiliate} />
            <Route path="/admin/:typeOfVisitor/:id" component={PreviousVisits} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
