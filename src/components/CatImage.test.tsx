import { render, screen } from '@testing-library/react'
import { ImageType } from '../types/Image.type'
import CatImage from './CatImage'

describe('CatImage component', () => {
  beforeAll(() => {})

  test('image should exist', () => {
    const image: ImageType = {
      id: '1',
      url: 'img.url',
    }
    render(<CatImage image={image} showFavoriteAction={false} />)
    const imgElement = screen.getByAltText('a cat')
    expect(imgElement).toBeInTheDocument()
  })

  test('favorite icon should exist', () => {
    const image: ImageType = {
      id: '1',
      url: 'img.url',
    }
    render(<CatImage image={image} showFavoriteAction />)
    const favoriteIconElement = screen.getByTestId('favorite-icon')
    expect(favoriteIconElement).toBeInTheDocument()
  })

  test('favorite icon should NOT exist', () => {
    const image: ImageType = {
      id: '1',
      url: 'img.url',
    }
    render(<CatImage image={image} showFavoriteAction={false} />)
    const favoriteIconElement = screen.queryByTestId('favorite-icon')
    expect(favoriteIconElement).not.toBeInTheDocument()
  })
})
