import { render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import FavoritesPage from './FavoritesPage'

describe('Favorites page component', () => {
  let useEffect: jest.SpyInstance

  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f())
  }

  beforeEach(() => {
    /** Mock useEffect */
    useEffect = jest.spyOn(React, 'useEffect').mockImplementation(() => {})
    mockUseEffect()
    mockUseEffect()
  })
  test('renders favorites page', () => {
    const wrapper = render(<FavoritesPage />, { wrapper: MemoryRouter })
    expect(wrapper).toMatchSnapshot()
  })
})
