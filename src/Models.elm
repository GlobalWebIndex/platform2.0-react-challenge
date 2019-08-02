module Models exposing (Breed, Cat, Category, RemoteData(..))


type alias Cat =
    { url : String
    , width : Int
    , height : Int
    , id : String
    , breeds : List Breed
    , categories : List Category
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
    { weight_imperial : String
    , id : String
    , name : String
    , description : String
    }
