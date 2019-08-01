module Decoders exposing (breedDecoder, breedListDecoder, catDecoder, catListDecoder, weightDecoder)

import Contracts exposing (..)
import Json.Decode as JD exposing (Decoder, field, int, string)


catDecoder : Decoder Cat
catDecoder =
    JD.map5 Cat
        (field "url" string)
        (field "width" int)
        (field "height" int)
        (field "id" string)
        (field "breeds" breedListDecoder)


catListDecoder : Decoder (List Cat)
catListDecoder =
    JD.list catDecoder


breedDecoder : Decoder Breed
breedDecoder =
    JD.map4 Breed
        (field "weight" weightDecoder)
        (field "id" string)
        (field "name" string)
        (field "description" string)


weightDecoder : Decoder Weight
weightDecoder =
    JD.map2 Weight
        (field "imperial" string)
        (field "metric" string)


breedListDecoder : Decoder (List Breed)
breedListDecoder =
    JD.list breedDecoder
