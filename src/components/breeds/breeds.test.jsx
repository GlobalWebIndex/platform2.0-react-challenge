/* eslint-disable no-undef */
import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderWithRedux from '../../redux/testRenderer';
import Breeds from './breeds';
import Api from '../../api';
import mockResponses from '../../api/__mocks__/mockResponses';

Api.getBreeds = jest.fn(() => mockResponses.getBreedsResponse);

describe('Breeds component', () => {
  afterEach(cleanup);

  it('renders two breeds', async () => {
    const { findAllByTestId } = renderWithRedux(<Breeds />);
    expect(await findAllByTestId('breed')).toHaveLength(3);
  });
});
