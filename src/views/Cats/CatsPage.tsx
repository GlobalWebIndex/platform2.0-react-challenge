import { Component } from 'react'
import CatsApi from '../../api/cats.api'
import { CatType } from '../../types/cat.type'
import Cat from './Cat'

type CatsState = {
  cats: CatType[]
  limit: number
  page: number
  order: 'Asc' | 'Desc'
}

// TODO: The eslint prefers to have stateless components. This rule had to be included to make this component work
// "react/prefer-stateless-function": [0, { "ignorePureComponents": true }]
// Check which component type is better for this case.
class CatsPage extends Component<{}, CatsState> {
  constructor(props: any) {
    super(props)
    this.state = {
      cats: [],
      limit: 10,
      order: 'Asc',
      page: 0,
    }
  }

  componentDidMount() {
    const { limit, page, order } = this.state
    CatsApi.getCats<CatType>(limit, page, order, this.setCatsState.bind(this))
  }

  private setCatsState(cats: CatType[]) {
    this.setState({ cats })
  }

  render() {
    const { cats } = this.state
    if (cats.length) {
      return (
        <ul>
          {cats.map(cat => (
            <Cat id={cat.id} url={cat.url} width={cat.width} />
          ))}
        </ul>
      )
    }

    return 'loading...'
  }
}

export default CatsPage
