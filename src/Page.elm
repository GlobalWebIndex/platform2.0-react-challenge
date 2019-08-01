module Page exposing (Page(..), isActive, navbarLink, view, viewErrors, viewHeader, viewMenu)

import BreedId exposing (..)
import Browser exposing (Document)
import Html exposing (Html, a, button, div, footer, h1, i, img, li, nav, p, span, text, ul)
import Html.Attributes exposing (class, classList, href, style)
import Html.Events exposing (onClick)
import Route exposing (Route)


type Page
    = Page1
    | Page2
    | Page3
    | Other


view : Page -> { title : String, content : Html msg } -> Document msg
view page { title, content } =
    { title = title ++ " - Cats"
    , body = viewHeader page :: content :: []
    }


viewHeader : Page -> Html msg
viewHeader page =
    nav [ class "container" ]
        [ div [ class "row" ]
            [ a [ class "col-6", Route.href (Route.Page1 (BreedId "-")) ]
                [ h1 [] [ text "Cats" ] ]
            , ul [ class "col-6 list-group list-group-horizontal" ] <|
                navbarLink page (Route.Page1 (BreedId "-")) [ text "Page1" ]
                    :: viewMenu page
            ]
        ]


viewMenu : Page -> List (Html msg)
viewMenu page =
    let
        linkTo =
            navbarLink page
    in
    [ linkTo Route.Page2 [ i [ class "ion-gear-a" ] [], text "\u{00A0}Page2" ]
    , linkTo Route.Page3 [ i [ class "ion-gear-a" ] [], text "\u{00A0}Page3" ]
    ]


navbarLink : Page -> Route -> List (Html msg) -> Html msg
navbarLink page route linkContent =
    li [ classList [ ( "nav-item", True ), ( "active", isActive page route ), ( "list-group-item", True ) ] ]
        [ a [ class "nav-link", Route.href route ] linkContent ]


isActive : Page -> Route -> Bool
isActive page route =
    case ( page, route ) of
        ( Page1, Route.Page1 (BreedId "-") ) ->
            True

        ( Page2, Route.Page2 ) ->
            True

        ( Page3, Route.Page3 ) ->
            True

        _ ->
            False


{-| Render dismissable errors. We use this all over the place!
-}
viewErrors : msg -> List String -> Html msg
viewErrors dismissErrors errors =
    if List.isEmpty errors then
        Html.text ""

    else
        div
            [ class "error-messages"
            , style "position" "fixed"
            , style "top" "0"
            , style "background" "rgb(250, 250, 250)"
            , style "padding" "20px"
            , style "border" "1px solid"
            ]
        <|
            List.map (\error -> p [] [ text error ]) errors
                ++ [ button [ onClick dismissErrors ] [ text "Ok" ] ]
