

export enum StatusEnum {
    INITIAL = 'INITIAL',
    REQUESTED = 'REQUESTED',
    CANCELLED = 'CANCELLED',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface ApiListResult<T> {
    data: T[]
    status: StatusEnum
}
export interface ApiResult<T> {
    data?: T
    status: StatusEnum
}

// Generated from http://www.json2ts.com/
export interface ICatBreed {
    weight: ICatBreedWeight
    id: string
    name: string
    cfa_url: string
    vetstreet_url: string
    vcahospitals_url: string
    temperament: string
    origin: string
    country_codes: string
    country_code: string
    description: string
    life_span: string
    indoor: number
    lap: number
    alt_names: string
    adaptability: number
    affection_level: number
    child_friendly: number
    dog_friendly: number
    energy_level: number
    grooming: number
    health_issues: number
    intelligence: number
    shedding_level: number
    social_needs: number
    stranger_friendly: number
    vocalisation: number
    experimental: number
    hairless: number
    natural: number
    rare: number
    rex: number
    suppressed_tail: number
    short_legs: number
    wikipedia_url: string
    hypoallergenic: number
    cat_friendly?: number
    bidability?: number
}
export interface ICatBreedWeight {
    imperial: string
    metric: string
}

export interface ICatCategory {
    id: number
    name: string
}

export interface ICat {
    breeds: ICatBreed[]
    id: string
    url: string
    width: number
    height: number
    categories: ICatCategory[]
}

export interface IFavorite {
    id: number
    user_id: string
    image_id: string
    sub_id: string
    created_at: Date
    image: {
        id: string
        url: string
    }
}

export interface IFavoriteBody {
    image_id: string
    sub_id: string
}

