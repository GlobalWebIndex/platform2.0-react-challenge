import { render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import CatsPage from './CatsPage'

describe('Cats Page component', () => {
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

  test('renders cats page', () => {
    const wrapper = render(<CatsPage />, { wrapper: MemoryRouter })
    expect(wrapper).toMatchSnapshot()
  })
})
