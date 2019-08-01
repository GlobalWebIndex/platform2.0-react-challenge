module ModalView exposing (init, modalAttributes, subscriptions, update, view)

import Accessibility.Modal as Modal
import Browser exposing (..)
import Contracts exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Platform


init : {} -> ( ModalModel, Cmd ModalMsg )
init flags =
    ( Modal.init
    , Cmd.none
    )


update : ModalMsg -> ModalModel -> Cat -> ( ModalModel, Cmd ModalMsg )
update msg model cat =
    Modal.update
        { dismissOnEscAndOverlayClick = True }
        msg
        model


subscriptions : ModalModel -> Sub ModalMsg
subscriptions model =
    Modal.subscriptions model


view : ModalModel -> Cat -> Html ModalMsg
view model cat =
    div []
        [ Modal.view
            { overlayColor = "rgba(128,128,128, 0.5)"
            , modalAttributes = modalAttributes
            , wrapMsg = identity
            , title = ( "Le cat", [] )
            , content =
                \{ firstFocusableElement, lastFocusableElement } ->
                    div [ style "display" "block", style "justify-content" "space-between" ]
                        [ a
                            (Html.Attributes.href "#" :: firstFocusableElement)
                            [ text "" ]
                        , div [ class "row" ]
                            [ div [ class "col-3" ]
                                [ text "Click to enlarge image" ]
                            , div
                                [ class "col-8" ]
                                [ a [ href cat.url, style "margin-left" "10px" ] [ text cat.url ]
                                ]
                            , div
                                [ class "col-1" ]
                                [ button [ onClick Modal.close, class "btn btn-danger", style "float" "right" ] [ text "X" ]
                                ]
                            ]
                        , div [ class "row", style "height" "310px" ]
                            [ div [ class "col-6", style "height" "310px" ]
                                [ img [ src cat.url, width 300, height 300, alt "Cat image" ] []
                                ]
                            , breedsView cat.breeds
                            ]
                        , a
                            (Html.Attributes.href "#" :: lastFocusableElement)
                            [ text "" ]
                        ]
            }
            model
        ]


breedListItem : Breed -> Html msg
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
        , hr [] []
        ]


breedsView : List Breed -> Html msg
breedsView model =
    div [ class "col-6" ]
        [ model
            |> List.map breedListItem
            |> div []
        ]


modalAttributes : List (Html.Attribute msg)
modalAttributes =
    [ style "background-color" "white"
    , style "border-radius" "8px"
    , style "border" "2px solid purple"
    , style "margin" "80px auto"
    , style "padding" "20px"
    , style "max-width" "650px"
    , style "min-height" "40vh"
    , style "max-height" "600px"
    ]
