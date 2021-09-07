import React, { Component } from 'react';
import { CatsApi } from '../../api/cats.api';
import { CatType } from '../../types/cat.type';
interface CatsState {
  cats: CatType[]
  limit: number
  page: number
  order: 'Asc' | 'Desc'
}

export class CatsPage extends Component<{}, CatsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      cats: [],
      limit: 10,
      order: 'Asc',
      page: 0
    }
  }

  
  componentDidMount() {
    const  { limit, page, order } = this.state
    CatsApi.getCats<CatType>(limit, page, order, this.setCatsState.bind(this)) 
  }

  setCatsState(cats: CatType[]) {
    this.setState({cats}) 
  }

  render() {
    const  { cats } = this.state
    if (cats.length) {
      return CatsList(cats)
    } else {
      return 'loading...'
    }
  }
}

function CatsList(cats: CatType[]) {
    return <ul>
        {
          cats.map(cat => CatItem(cat))
        }
        </ul>     
}


function CatItem(cat: CatType) {
  return <li key={cat.id}>
            <img loading="lazy" src={cat.url} alt='a cat' />
        </li>
}