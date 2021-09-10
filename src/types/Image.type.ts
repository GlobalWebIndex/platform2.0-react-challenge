import { BreedType } from './Breed.type'

export type ImageType = {
  id: string
  url: string
  width?: number
  height?: number
  breeds?: BreedType[]
}
