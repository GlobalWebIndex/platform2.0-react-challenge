module Main exposing (main)

import BreedId exposing (..)
import Browser exposing (Document)
import Browser.Navigation as Nav
import Dict exposing (..)
import Html exposing (..)
import Json.Decode as Decode exposing (Value)
import Page exposing (Page)
import Page.Blank as Blank
import Page.Page1 as Page1
import Page.Page2 as Page2
import Page.Page3 as Page3
import Route exposing (Route)
import State exposing (..)
import Url exposing (Url)


type Model
    = Redirect State
    | Page1 Page1.Model
    | Page2 Page2.Model
    | Page3 Page3.Model


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url navKey =
    let
        initCat =
            { url = "https://cdn2.thecatapi.com/images/5eg.jpg"
            , width = 300
            , height = 300
            , id = "5eg"
            , breeds = []
            }
    in
    changeRouteTo (Route.fromUrl url)
        (Redirect (Favorites navKey (Dict.fromList []) initCat))


view : Model -> Document Msg
view model =
    let
        viewPage page toMsg config =
            let
                { title, body } =
                    Page.view page config
            in
            { title = title
            , body = List.map (Html.map toMsg) body
            }
    in
    case model of
        Redirect _ ->
            Page.view Page.Other Blank.view

        Page1 page1 ->
            viewPage Page.Page1 GotPage1Msg (Page1.view page1)

        Page2 page2 ->
            viewPage Page.Page2 GotPage2Msg (Page2.view page2)

        Page3 page3 ->
            viewPage Page.Page3 GotPage3Msg (Page3.view page3)


type Msg
    = ChangedRoute (Maybe Route)
    | ChangedUrl Url
    | GotState State
    | ClickedLink Browser.UrlRequest
    | GotPage1Msg Page1.Msg
    | GotPage2Msg Page2.Msg
    | GotPage3Msg Page3.Msg


toState : Model -> State
toState page =
    case page of
        Redirect state ->
            state

        Page1 page1 ->
            Page1.toState page1

        Page2 page2 ->
            Page2.toState page2

        Page3 page3 ->
            Page3.toState page3


changeRouteTo : Maybe Route -> Model -> ( Model, Cmd Msg )
changeRouteTo maybeRoute model =
    let
        state =
            toState model
    in
    case maybeRoute of
        Nothing ->
            Page1.init state maybeRoute
                |> updateWith Page1 GotPage1Msg model

        Just (Route.Page1 breedId) ->
            Page1.init state maybeRoute
                |> updateWith Page1 GotPage1Msg model

        Just Route.Page2 ->
            Page2.init state maybeRoute
                |> updateWith Page2 GotPage2Msg model

        Just Route.Page3 ->
            Page3.init state maybeRoute
                |> updateWith Page3 GotPage3Msg model

        _ ->
            Page1.init state maybeRoute
                |> updateWith Page1 GotPage1Msg model


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( msg, model ) of
        ( ClickedLink urlRequest, _ ) ->
            case urlRequest of
                Browser.Internal url ->
                    case url.fragment of
                        Nothing ->
                            ( model, Cmd.none )

                        Just _ ->
                            ( model
                            , Nav.pushUrl (State.navKey (toState model)) (Url.toString url)
                            )

                Browser.External href ->
                    ( model
                    , Nav.load href
                    )

        ( ChangedUrl url, _ ) ->
            changeRouteTo (Route.fromUrl url) model

        ( ChangedRoute route, _ ) ->
            changeRouteTo route model

        ( GotPage1Msg subMsg, Page1 page1 ) ->
            Page1.update subMsg page1
                |> updateWith Page1 GotPage1Msg model

        ( GotPage2Msg subMsg, Page2 page2 ) ->
            Page2.update subMsg page2
                |> updateWith Page2 GotPage2Msg model

        ( GotPage3Msg subMsg, Page3 page3 ) ->
            Page3.update subMsg page3
                |> updateWith Page3 GotPage3Msg model

        ( GotState state, Redirect _ ) ->
            ( Redirect state
            , Route.replaceUrl (State.navKey state) (Route.Page1 (BreedId "-"))
            )

        ( _, _ ) ->
            ( model, Cmd.none )


updateWith : (subModel -> Model) -> (subMsg -> Msg) -> Model -> ( subModel, Cmd subMsg ) -> ( Model, Cmd Msg )
updateWith toModel toMsg model ( subModel, subCmd ) =
    ( toModel subModel
    , Cmd.map toMsg subCmd
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        Page1 page1 ->
            Sub.map GotPage1Msg (Page1.subscriptions page1)

        Page2 page2 ->
            Sub.map GotPage2Msg (Page2.subscriptions page2)

        Page3 page3 ->
            Sub.map GotPage3Msg (Page3.subscriptions page3)

        _ ->
            Sub.none


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , onUrlChange = ChangedUrl
        , onUrlRequest = ClickedLink
        , subscriptions = subscriptions
        , update = update
        , view = view
        }
