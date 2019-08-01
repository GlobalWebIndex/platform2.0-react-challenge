module Page.Page2 exposing (Model, Msg(..), Status(..), getBreeds, init, subscriptions, toState, update, view)

import BreedId exposing (..)
import Browser
import Contracts exposing (..)
import Decoders exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as JD exposing (Decoder, field, int, string)
import Route exposing (..)
import State exposing (..)


type alias Model =
    { state : State
    , status : Status
    , maybeRoute : Maybe Route
    }


toState : Model -> State
toState model =
    model.state


type Msg
    = GetRequest
    | GetResponse (Result Http.Error (List Breed))
    | GoToBreedDetailsPage String


type Status
    = Failure
    | Loading
    | Success (List Breed)


init : State -> Maybe Route -> ( Model, Cmd Msg )
init state maybeRoute =
    ( { state = state, status = Loading, maybeRoute = maybeRoute }, getBreeds )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GetRequest ->
            ( { model | status = Loading }, getBreeds )

        GetResponse result ->
            case result of
                Ok url ->
                    ( { model | status = Success url }, Cmd.none )

                Err _ ->
                    ( { model | status = Failure }, Cmd.none )

        GoToBreedDetailsPage breedId ->
            ( model, Route.replaceUrl (State.navKey model.state) (Route.Page1 (BreedId breedId)) )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


view : Model -> { title : String, content : Html Msg }
view model =
    { title = "Page 2"
    , content =
        case model.status of
            Failure ->
                div [ class "container" ]
                    [ text "I could not load breeds for some reason. "
                    , button [ onClick GetRequest, class "btn btn-info btn-lg btn-block" ] [ text "Try Again!" ]
                    ]

            Loading ->
                div [ class "container" ]
                    [ text "Loading..."
                    ]

            Success breedList ->
                div [ class "container" ]
                    [ breedsView breedList
                    ]
    }


breedsView : List Breed -> Html Msg
breedsView model =
    div []
        [ h2 [] [ text "All Breeds" ]
        , model
            |> List.map breedListItem
            |> div []
        ]


breedListItem : Breed -> Html Msg
breedListItem item =
    section []
        [ div []
            [ span [ style "font-weight" "bold" ] [ text "Name: " ]
            , span [ style "font-weight" "light" ] [ text item.name ]
            ]
        , div []
            [ span [ style "font-weight" "bold" ] [ text "Description: " ]
            , span [ style "font-weight" "light" ] [ text item.description ]
            ]
        , div []
            [ span [ style "font-weight" "bold" ] [ text "Weight: " ]
            , span [ style "font-weight" "light" ] [ text (item.weight.metric ++ "kg") ]
            ]
        , div []
            [ button [ onClick (GoToBreedDetailsPage item.id), class "btn btn-info btn-lg btn-block" ] [ text "Details" ]
            ]
        , hr [] []
        ]


getBreeds : Cmd Msg
getBreeds =
    let
        decoder =
            JD.list breedDecoder

        headers =
            [ Http.header "x-api-key" "d5732e27-6882-40de-bf70-4a418a54bb57"
            ]

        url =
            "https://api.thecatapi.com/v1/breeds"
    in
    Http.request
        { method = "GET"
        , headers = headers
        , url = url
        , body = Http.emptyBody
        , expect = Http.expectJson GetResponse breedListDecoder
        , timeout = Nothing
        , tracker = Nothing
        }
