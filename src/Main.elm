module Main exposing (Model, Msg(..), catItemDecoder, catListDecoder, getCatList, init, initialModel, main, modalView, renderImages, subscriptions, update, view)

import Browser exposing (Document)
import Browser.Dom exposing (getViewport, getViewportOf, setViewport)
import Browser.Events
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as JD exposing (Decoder, field, int, list, map2, maybe, nullable, string)
import Models exposing (..)
import Url exposing (Url)
import Url.Parser as UP exposing ((</>), (<?>), Parser, map, oneOf, s, string)
import Url.Parser.Query as Query



-- MAIN


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = ChangedUrl
        , onUrlRequest = ClickedLink
        }



-- MODEL


type alias Model =
    { cats : List Models.Cat
    , selectedCat : Maybe Models.Cat
    , showLoading : Bool
    , showModal : Bool
    , key : Nav.Key
    , route : Maybe Route
    }


initialModel : Url -> Nav.Key -> Model
initialModel url key =
    { cats = []
    , selectedCat = Nothing
    , showLoading = True
    , showModal = False
    , key = key
    , route = Just Home
    }


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( initialModel url key, getCatList )



-- UPDATE


type Msg
    = MorePlease
    | Loading
    | GotList (Result Http.Error (List Models.Cat))
    | ToggleModal (Maybe Models.Cat)
    | ChangedUrl Url
    | ClickedLink Browser.UrlRequest


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        MorePlease ->
            ( { model | showLoading = True }, getCatList )

        Loading ->
            ( { model | showLoading = True }, Cmd.none )

        GotList result ->
            case result of
                Ok catlist ->
                    ( { model | showLoading = False, cats = catlist }, Cmd.none )

                Err _ ->
                    ( { model | cats = [] }, Cmd.none )

        ToggleModal selected ->
            ( { model | showModal = not model.showModal, selectedCat = selected }, Cmd.none )

        ClickedLink urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        ChangedUrl url ->
            let
                route =
                    UP.parse routeParser url
            in
            case route of
                Just (BreedRoute s) ->
                    ( { model | route = route, showModal = False, selectedCat = Nothing }, getBreedCats s )

                Just Home ->
                    ( { model | route = route }, getCatList )

                Nothing ->
                    ( { model | route = route }, Cmd.none )



-- ROUTE


type Page
    = HomePage
    | BreedPage (List Models.Cat)


type Route
    = Home
    | BreedRoute String


routeParser : Parser (Route -> a) a
routeParser =
    oneOf
        [ map Home UP.top
        , map BreedRoute (UP.s "breed" </> UP.string)
        ]


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Document Msg
view model =
    { title = "Cats"
    , body =
        [ app model ]
    }


app : Model -> Html Msg
app model =
    div [ id "Cat App" ]
        [ header [ class "navbar " ]
            [ a [ href "/", class "navbar-brand" ] [ text "Elm Cat List" ] ]
        , section [ class "cat-list" ]
            [ createList model ]
        ]


createList : Model -> Html Msg
createList model =
    if model.showLoading then
        div [] [ text "Loading" ]

    else
        div []
            [ div [ class "d-flex flex-wrap justify-content-center align-items-stretch" ] (List.map renderImages model.cats)
            , button [ onClick MorePlease ] [ text "More please" ]
            , modalView model
            ]


modalView : Model -> Html Msg
modalView model =
    case model.selectedCat of
        Nothing ->
            div [ id "modal", class "close" ]
                [ div [ class "overlay" ] []
                , section [ class "content" ] [ text "No selected cat" ]
                ]

        Just newItem ->
            div [ id "modal", class "open" ]
                [ div [ class "overlay" ] []
                , div [ class "modal" ]
                    [ div [ class "modal-dialog" ]
                        [ div [ class "modal-content" ]
                            [ div [ class "modal-header" ]
                                [ h5 [] [ text "Cat preview" ]
                                , button [ class "close", onClick <| (ToggleModal <| Nothing) ] [ text "x" ]
                                ]
                            , div [ class "modal-body" ]
                                [ div [ class "d-block" ] [ renderBreeds newItem.breeds ]
                                , img [ src newItem.url ] []
                                ]
                            ]
                        ]
                    ]
                ]


renderBreeds : Maybe (List Models.Breed) -> Html Msg
renderBreeds breed =
    case breed of
        Nothing ->
            span [] []

        Just breeds ->
            div [] (List.map renderABreed breeds)


renderABreed : Breed -> Html Msg
renderABreed breed =
    a [ href ("/breed/" ++ breed.id), class "d-block" ] [ text breed.name ]


renderImages : Models.Cat -> Html Msg
renderImages lst =
    div [ class "list d-inline-flex m-1 align-self-center" ]
        [ div [ onClick <| (ToggleModal <| Just lst) ]
            [ img [ src lst.url, width 300 , class "pointer"] []
            ]
        ]



-- HTTP


getCatList : Cmd Msg
getCatList =
    let
        headers =
            [ Http.header "x-api-key" Models.api_key ]
    in
    Http.request
        { body = Http.emptyBody
        , method = "GET"
        , url = "https://api.thecatapi.com/v1/images/search?limit=10"
        , expect = Http.expectJson GotList catListDecoder
        , headers = headers
        , timeout = Nothing
        , tracker = Nothing
        }


getBreedCats : String -> Cmd Msg
getBreedCats breedId =
    let
        headers =
            [ Http.header "x-api-key" Models.api_key ]
    in
    Http.request
        { body = Http.emptyBody
        , method = "GET"
        , url = "https://api.thecatapi.com/v1/images/search?limit=10&breed_id=" ++ breedId
        , expect = Http.expectJson GotList catListDecoder
        , headers = headers
        , timeout = Nothing
        , tracker = Nothing
        }


catItemDecoder : Decoder Models.Cat
catItemDecoder =
    JD.map6 Cat
        (field "url" JD.string)
        (field "width" int)
        (field "height" int)
        (field "id" JD.string)
        (maybe (field "breeds" breedListDecoder))
        (maybe (field "categories" categoryListDecoder))


catListDecoder : Decoder (List Models.Cat)
catListDecoder =
    JD.list catItemDecoder


breedItemDecoder : Decoder Models.Breed
breedItemDecoder =
    JD.map4 Breed
        (maybe (field "weight_imperial" JD.string))
        (field "id" JD.string)
        (field "name" JD.string)
        (field "description" JD.string)


breedListDecoder : Decoder (List Models.Breed)
breedListDecoder =
    JD.list breedItemDecoder


categoryItemDecoder : Decoder Models.Category
categoryItemDecoder =
    JD.map2 Category
        (field "id" int)
        (field "name" JD.string)


categoryListDecoder : Decoder (List Models.Category)
categoryListDecoder =
    JD.list categoryItemDecoder
