module Route exposing (Route(..), fromUrl, href, parser, replaceUrl, routeToString)

import BreedId exposing (..)
import Browser.Navigation as Nav
import Html exposing (Attribute)
import Html.Attributes as Attr
import Url exposing (Url)
import Url.Parser exposing ((</>), Parser, int, map, oneOf, s, string)



type Route
    = Page1 BreedId
    | Page2
    | Page3
    | Root


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Url.Parser.map Page1 (s "page1" </> BreedId.urlParser)
        , Url.Parser.map Page2 (s "page2")
        , Url.Parser.map Page3 (s "page3")
        ]


href : Route -> Attribute msg
href targetRoute =
    Attr.href (routeToString (Just targetRoute))


replaceUrl : Nav.Key -> Route -> Cmd msg
replaceUrl key route =
    Nav.replaceUrl key (routeToString (Just route))


fromUrl : Url -> Maybe Route
fromUrl url =
    { url | path = Maybe.withDefault "" url.fragment, fragment = Nothing }
        |> Url.Parser.parse parser


routeToString : Maybe Route -> String
routeToString page =
    let
        pieces =
            case page of
                Just Root ->
                    []

                Just (Page1 breedId) ->
                    [ "page1", BreedId.toString breedId ]

                Just Page2 ->
                    [ "page2" ]

                Just Page3 ->
                    [ "page3" ]

                _ ->
                    [ "page1", "-" ]
    in
    "#/" ++ String.join "/" pieces
