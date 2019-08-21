module Models exposing (Breed, Cat, Category,api_key, RemoteData(..))

api_key =
    "1197d305-e0e8-4bca-add4-bd778f68c21b"

type alias Cat =
    { url : String
    , width : Int
    , height : Int
    , id : String
    , breeds : Maybe (List Breed)
    , categories : Maybe (List Category)
    }


type RemoteData error value
    = NotAsked
    | Loading
    | Failure error
    | Success value


type alias Category =
    { id : Int
    , name : String
    }


type alias Breed =
    { weight_imperial : Maybe String
    , id : String
    , name : String
    , description : String
    }
