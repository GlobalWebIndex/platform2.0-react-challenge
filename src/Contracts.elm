module Contracts exposing (Breed, Cat, ModalModel, ModalMsg, RemoteData(..), Weight)

import Accessibility.Modal as Modal


type alias ModalModel =
    Modal.Model


type alias ModalMsg =
    Modal.Msg


type alias Cat =
    { url : String
    , width : Int
    , height : Int
    , id : String
    , breeds : List Breed
    }


type alias Weight =
    { imperial : String
    , metric : String
    }


type RemoteData error value
    = NotAsked
    | Loading
    | Failure error
    | Success value


type alias Breed =
    { weight : Weight
    , id : String
    , name : String
    , description : String

    -- , vetstreet_url : String
    -- , temperament : String
    -- , origin : String
    -- , country_codes : String
    -- , country_code : String
    -- , life_span : String
    -- , indoor : Int
    -- , lap : Int
    -- , alt_names : String
    -- , adaptability : Int
    -- , affection_level : Int
    -- , child_friendly : Int
    -- , dog_friendly : Int
    -- , energy_level : Int
    -- , grooming : Int
    -- , health_issues : Int
    -- , intelligence : Int
    -- , shedding_level : Int
    -- , social_needs : Int
    -- , stranger_friendly : Int
    -- , vocalisation : Int
    -- , experimental : Int
    -- , hairless : Int
    -- , natural : Int
    -- , rare : Int
    -- , rex : Int
    -- , suppressed_tail : Int
    -- , short_legs : Int
    -- , hypoallergenic : Int
    }
