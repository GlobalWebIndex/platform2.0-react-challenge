import { render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import BreedsPage from './BreedsPage'

describe('Breeds page component', () => {
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

  test('renders breeds page', () => {
    const wrapper = render(<BreedsPage />, { wrapper: MemoryRouter })
    expect(wrapper).toMatchSnapshot()
  })
})
