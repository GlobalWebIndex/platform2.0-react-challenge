import { BreedType } from './Breed.type'

// TODO: change to ImageType
export type CatType = {
  breeds: BreedType[]
  id: string
  url: string
  width: number
  height: number
}
