module Page.Page3 exposing (Model, Msg(..), catCard, catCardList, catsView, init, subscriptions, toState, update, view)

import Accessibility.Modal as Modal
import Browser
import Contracts exposing (..)
import Decoders exposing (..)
import Dict exposing (..)
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
    }


type Msg
    = AddMostFavorite Cat
    | RemoveFromFavorites Cat


init : State -> Maybe Route -> ( Model, Cmd Msg )
init state maybeRoute =
    ( { state = state
      }
    , Cmd.none
    )


toState : Model -> State
toState model =
    model.state


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddMostFavorite cat ->
            ( { model | state = State.addMostFavorite model.state cat }, Cmd.none )

        RemoveFromFavorites cat ->
            let
                removedFromFavorites =
                    State.removeFromFavorites model.state cat
            in
            ( { model | state = removedFromFavorites }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


view : Model -> { title : String, content : Html Msg }
view model =
    { title = "Page 3"
    , content =
        div [ class "container" ]
            [ mostFavoriteView model
            , h2 [] [ text "Favorite Cats" ]
            , catsView (State.getFavorites model.state)
            ]
    }


mostFavoriteView : Model -> Html Msg
mostFavoriteView model =
    div [ class "row", style "background-color" "red", style "color" "white" ]
        [ div [ class "col-6", style "text-align" "right" ]
            [ h2 [] [ text "Your favorite cat" ]
            , img [ src "http://www.pngmart.com/files/5/Crown-PNG-Free-Download.png", width 150, height 150, class "col-3" ] []
            ]
        , div [ class "col-6" ]
            [ mostFavoriteCard (State.getMostFavorite model.state)
            ]
        ]


mostFavoriteCard : Cat -> Html Msg
mostFavoriteCard cat =
    section [ class "col-6" ]
        [ h4 [ style "font-weight" "bold" ] [ text ("Cat Id: " ++ cat.id) ]
        , img [ src cat.url, width 200, height 200, alt "Cat image" ] []
        , div [ style "font-weight" "light" ] [ text ("Cat Url: " ++ cat.url) ]
        ]


catsView : List Cat -> Html Msg
catsView catList =
    div [ class "row" ]
        [ catCardList catList
        ]


catCardList : List Cat -> Html Msg
catCardList list =
    list
        |> List.map catCard
        |> div [ class "row", style "margin-left" "0px", style "margin-right" "0px" ]


catCard : Cat -> Html Msg
catCard cat =
    section [ class "col-5 border border-primary rounded", style "margin" "15px 15px 0 0", style "min-width" "300px" ]
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
        , button [ onClick (AddMostFavorite cat), class "btn btn-primary btn-lg btn-block", style "margin-bottom" "5px" ] [ text "Hail the new Queen !!!" ]
        , button [ onClick (RemoveFromFavorites cat), class "btn btn-danger btn-lg btn-block", style "margin-bottom" "5px" ] [ text "Remove from favorites" ]
        ]
