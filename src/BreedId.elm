module BreedId exposing (BreedId(..), toHtml, toString, urlParser)

import Html exposing (Html)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode exposing (Value)
import Url.Parser


type BreedId
    = BreedId String


toString : BreedId -> String
toString (BreedId breedId) =
    breedId


urlParser : Url.Parser.Parser (BreedId -> a) a
urlParser =
    Url.Parser.custom "BREEDID" (\str -> Just (BreedId str))


toHtml : BreedId -> Html msg
toHtml (BreedId breedId) =
    Html.text breedId
