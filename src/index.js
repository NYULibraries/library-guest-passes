import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles.scss";
import Form from "./components/Form";
import Admin from "./components/Admin";
import Banner from "./components/Banner";

ReactDOM.render(
  <React.StrictMode>
    <div id="wrapper" role="main">
      <Banner />
      <div className="container mt-3">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Form} />
            <Route exact path="/admin" component={Admin} />
            {/*
            full list of guests
            <Route path="/admin/guests/" component={Tutorial} /> 
            previous visit view of guests
            <Route path="/admin/guests/:id" component={Tutorial} />
            full list of affiliates
            <Route path="/admin/guests/:id" component={Tutorial} />
            previous visit view of affiliates
            <Route path="/admin/affiliates/:id" component={Tutorial} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
