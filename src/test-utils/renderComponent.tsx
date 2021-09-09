import React, { ReactElement } from 'react';
import { RenderOptions, render as rtlRender, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from '../images/imagesSlice';
import favouritesReducer from '../favourites/favouritesSlice';
import breedsReducer from '../breeds/breedsSlice';

const renderComponent = (ui: ReactElement, renderOptions?: RenderOptions): RenderResult => {
  const store = configureStore({
    reducer: {
      images: imagesReducer,
      favourites: favouritesReducer,
      breeds: breedsReducer,
    },
  });

  const Wrapper : React.FC = ({ children }) => (
    <Provider store={store}>
      <Router>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </Router>
    </Provider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';

export { renderComponent };
