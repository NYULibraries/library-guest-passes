import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./_form.scss";
import "./_admin.scss";
import Form from "./components/Form";
import Banner from "./components/Banner";
import PreviousVisits from "./components/PreviousVisits";
import EditVisitor from "./components/EditVisitor";
import Breadcrumb from "./components/Breadcrumb";
import Visitor from "./components/Visitor";

ReactDOM.render(
  <React.StrictMode>
    <div id="wrapper" role="main">
      <Banner />
      <Breadcrumb />
      <div className="container mt-3">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/admin/guests" element={<Visitor />} />
            <Route path="/admin/affiliates" element={<Visitor />} />
            <Route path="/admin/:typeOfVisitor/:id" element={<PreviousVisits />} />
            <Route path="/admin/:typeOfVisitor/:id/edit" element={<EditVisitor />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
