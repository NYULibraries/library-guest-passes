import '@testing-library/jest-dom';
import React from 'react';

require('mysql2/node_modules/iconv-lite').encodingExists('foo');

global.React = React;

global.console = {
  ...console,
  // error: jest.fn(),
  // log: jest.fn(),
};