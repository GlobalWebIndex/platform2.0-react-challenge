module Page.Page1 exposing (Model, Msg(..), Status(..), catsView, getCats, init, subscriptions, toState, update, view)

import Accessibility.Modal as Modal
import BreedId exposing (..)
import Browser
import Contracts exposing (..)
import Decoders exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as JD exposing (Decoder, field, int, string)
import ModalView exposing (..)
import Route exposing (..)
import State exposing (..)


type alias Model =
    { state : State
    , status : Status
    , maybeRoute : Maybe Route
    , modal : ModalModel
    , list : List Cat
    , selectedItem : Cat
    }


type Status
    = Failure
    | Loading
    | Success (List Cat)
    | ModalStatus


type Msg
    = GetRequest
    | GetResponse (Result Http.Error (List Cat))
    | ModalCreate Contracts.ModalMsg
    | ModalOpen ( Contracts.ModalMsg, Cat )
    | AddToFavorites Cat


init : State -> Maybe Route -> ( Model, Cmd Msg )
init state maybeRoute =
    let
        initModel =
            { state = state
            , maybeRoute = maybeRoute
            , status = Loading
            , modal = Modal.init
            , list = []
            , selectedItem = State.getMostFavorite state
            }
    in
    ( initModel, getCats initModel )


toState : Model -> State
toState model =
    model.state


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GetRequest ->
            ( { model | status = Loading }, getCats model )

        GetResponse result ->
            case result of
                Ok response ->
                    ( { model | status = Success response, list = response }, Cmd.none )

                Err _ ->
                    ( { model | status = Failure }, Cmd.none )

        ModalCreate modalMsg ->
            let
                ( modalModel, cmdMsg ) =
                    ModalView.update modalMsg model.modal model.selectedItem
            in
            ( { model | status = ModalStatus, modal = modalModel }
            , Cmd.batch
                [ getCats model
                , Cmd.map ModalCreate cmdMsg
                ]
            )

        ModalOpen ( modalMsg, cat ) ->
            let
                ( modalModel, cmdMsg ) =
                    ModalView.update modalMsg model.modal model.selectedItem
            in
            ( { model | status = ModalStatus, selectedItem = cat, modal = modalModel }, Cmd.map ModalCreate cmdMsg )

        AddToFavorites cat ->
            let
                addedToFavorites =
                    State.addToFavorites model.state cat
            in
            ( { model | state = addedToFavorites }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


view : Model -> { title : String, content : Html Msg }
view model =
    let
        queryString =
            case model.maybeRoute of
                Just (Page1 breedId) ->
                    BreedId.toString breedId

                _ ->
                    "-"

        pageTitle =
            if queryString == "-" then
                "Random Cats"

            else
                "Cats by id:" ++ queryString

        modal =
            ModalView.view model.modal model.selectedItem |> Html.map ModalCreate
    in
    { title = "Page 1"
    , content =
        div [ class "container" ]
            [ h2 [] [ text pageTitle ]
            , div [ class "row", style "margin-left" "0px", style "margin-right" "-19px" ]
                [ button [ onClick GetRequest, class "btn btn-info btn-lg btn-block col-10" ] [ text "Get 10 cats" ]
                ]
            , catsView model
            , modal
            ]
    }


catsView : Model -> Html Msg
catsView model =
    case model.status of
        Failure ->
            div []
                [ text "I could not load cats for some reason. "
                ]

        Success catList ->
            div []
                [ catCardList model.list
                ]

        _ ->
            text "Loading..."


getCats : Model -> Cmd Msg
getCats model =
    let
        searchParameter =
            case model.maybeRoute of
                Just (Page1 breedId) ->
                    BreedId.toString breedId

                _ ->
                    "-"

        url =
            if searchParameter == "-" then
                "https://api.thecatapi.com/v1/images/search?limit=10"

            else
                "https://api.thecatapi.com/v1/images/search?limit=10&breed_id=" ++ searchParameter
    in
    Http.get
        { url = url
        , expect = Http.expectJson GetResponse catListDecoder
        }


catCard : Cat -> Html Msg
catCard cat =
    section [ class "col-5 border border-primary rounded", style "margin" "15px 15px 0 0" ]
        [ h2 [ style "font-weight" "bold" ] [ text ("Cat Id: " ++ cat.id) ]
        , img
            [ src cat.url
            , class "img-fluid w-100"
            , style "max-height" "200px"
            , style "min-height" "200px"
            , alt "Cat image"
            ]
            []
        , div [ style "font-weight" "light", style "min-height" "48px" ] [ text ("Cat Url: " ++ cat.url) ]
        , button [ onClick (ModalOpen ( Modal.open "1", cat )), class "btn btn-info btn-lg btn-block" ] [ text "Details" ]
        , button [ onClick (AddToFavorites cat), class "btn btn-primary btn-lg btn-block", style "margin-bottom" "5px" ] [ text "Add to favorites" ]
        ]


catCardList : List Cat -> Html Msg
catCardList list =
    list
        |> List.map catCard
        |> div [ class "row", style "margin-left" "0px", style "margin-right" "0px" ]
