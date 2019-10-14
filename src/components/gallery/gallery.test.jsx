/* eslint-disable no-undef */
import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderWithRedux from '../../redux/testRenderer';
import Gallery from './gallery';

jest.mock('../../api');

describe('Gallery component', () => {
  afterEach(cleanup);

  it('renders two tiles', async () => {
    const { findAllByTestId } = renderWithRedux(<Gallery />);
    expect(await findAllByTestId('tile')).toHaveLength(2);
  });
});
