// counter.test.js
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import createReduxStore from './store';

const reduxStore = createReduxStore();
const renderWithRedux = (component) => (
  render(<Provider store={reduxStore}>{component}</Provider>)
);

export default renderWithRedux;
