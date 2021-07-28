import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import "./styles.scss";
import Form from './components/Form';
import Header from './components/Header';

ReactDOM.render(
  <React.StrictMode>
    <div id="wrapper">
      <Header />
      <Form />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
