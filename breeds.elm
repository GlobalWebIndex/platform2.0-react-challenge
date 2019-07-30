import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as JD exposing (Decoder, map2, field, string, int ,list)



-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- MODEL


type Model
  = Failure
  | Loading
  | Success (List Breed)

type alias Breed =
  { id : String
    ,name: String
    ,description: String
  }

init : () -> (Model, Cmd Msg)
init _ =
  (Loading, getbreedList)


api_key = "bdb0f0b8-7f00-4e07-a6e9-e06c10f8bc63"
-- UPDATE


type Msg
  = MorePlease
  | GotList (Result Http.Error (List Breed))


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    MorePlease ->
      (Loading, getbreedList)

    GotList result ->
      case result of
        Ok breedList ->
          (Success breedList, Cmd.none)

        Err _ ->
                (Failure, Cmd.none)


      -- handle error message


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ h2 [] [ text "Cat breeds" ]
    , viewGif model
    ]

renderImages : Breed -> Html Msg
renderImages lst =
        li []
        [text lst.name ]

viewGif : Model -> Html Msg
viewGif model =
  case model of
    Failure ->
      div []
        [ text "I could not load the cat breeds for some reason. "
        ]
    Loading ->
      text "Loading..."

    Success breedList ->
      div []
        [ ul [] (List.map renderImages breedList)]
-- HTTP

getbreedList : Cmd Msg
getbreedList =
  let headers  = [ Http.header "x-api-key" api_key ]
  in
  Http.request
    { body = Http.emptyBody
    , method="GET"
    , url = "https://api.thecatapi.com/v1/breeds"
    , expect = Http.expectJson GotList breedListDecoder
    , headers = headers
    , timeout = Nothing
    , tracker = Nothing
  }


getbreedCats : String -> Cmd Msg
getbreedCats  breed_id =
  let headers  = [ Http.header "x-api-key" api_key ]
  in
  Http.request
    { body = Http.emptyBody
    , method="GET"
    , url = "https://api.thecatapi.com/v1/images/search?breed_id="++breed_id
    , expect = Http.expectJson GotList breedListDecoder
    , headers = headers
    , timeout = Nothing
    , tracker = Nothing
  }

breedItemDecoder: Decoder Breed
breedItemDecoder =
  JD.map3 Breed
    (field "id" string)
    (field "name" string)
    (field "description" string)


breedListDecoder: Decoder (List Breed)
breedListDecoder =
  JD.list breedItemDecoder
