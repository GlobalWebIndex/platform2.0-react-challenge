import  *  as models from './models'

export interface CatProps  {
    cat: models.ICat
    isModal: boolean
}

export interface SearchProps  {
    breed: models.ICatBreed
}