import '@testing-library/jest-dom';
import React from 'react';

import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
iconv.encodings = encodings;

global.React = React;

global.console = {
  ...console,
  error: jest.fn(),
  log: jest.fn(),
};