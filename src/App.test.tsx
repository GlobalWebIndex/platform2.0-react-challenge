import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';
import App from './App';

test('renders application', () => {
  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByTestId("load-more-button-id")).toBeInTheDocument();
});
