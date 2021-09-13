import { render } from '@testing-library/react'
import CatsPage from './CatsPage'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({
    pathname: '/another-route',
    search: '',
    hash: '',
    state: null,
    key: '',
  }),
  useHistory: jest.fn().mockReturnValue([]),
}))

describe('Cats Page component', () => {
  beforeAll(() => {})

  test('renders cats page', () => {
    const wrapper = render(<CatsPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
