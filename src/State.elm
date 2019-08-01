module State exposing (State(..), addMostFavorite, addToFavorites, getFavorites, getMostFavorite, navKey, removeFromFavorites)

import Browser.Navigation as Nav
import Contracts exposing (..)
import Dict exposing (Dict)


type State
    = Favorites Nav.Key (Dict String Cat) Cat


navKey : State -> Nav.Key
navKey state =
    case state of
        Favorites key _ _ ->
            key


getMostFavorite : State -> Cat
getMostFavorite state =
    case state of
        Favorites _ _ cat ->
            cat


getFavorites : State -> List Cat
getFavorites state =
    case state of
        Favorites _ dict _ ->
            Dict.values dict


addToFavorites : State -> Cat -> State
addToFavorites state cat =
    case state of
        Favorites navigationKey list mostFavoriteCat ->
            let
                result =
                    Favorites navigationKey (Dict.insert cat.id cat list) mostFavoriteCat
            in
            result


removeFromFavorites : State -> Cat -> State
removeFromFavorites state cat =
    case state of
        Favorites navigationKey list mostFavoriteCat ->
            let
                result =
                    Favorites navigationKey (Dict.remove cat.id list) mostFavoriteCat
            in
            result


addMostFavorite : State -> Cat -> State
addMostFavorite state cat =
    case state of
        Favorites navigationKey list mostFavoriteCat ->
            let
                result =
                    Favorites navigationKey list cat
            in
            result
