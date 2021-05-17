import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Form from './components/Form';
import Header from './components/Header';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Form />
  </React.StrictMode>,
  document.getElementById('root')
);
