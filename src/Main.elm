module Main exposing (Cat, Model, Msg(..), api_key, catItemDecoder, catListDecoder, getCatList, init, initialModel, main, modalView, renderImages, subscriptions, update, view)

import Bootstrap.Button as Button
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Bootstrap.Grid.Row as Row
import Bootstrap.Modal as Modal
import Browser exposing (Document)
import Browser.Dom exposing (getViewport, getViewportOf, setViewport)
import Browser.Events
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as JD exposing (Decoder, field, int, list, map2, string)
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser)



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
    { cats : List Cat
    , showLoading : Bool
    , showModal : Bool
    , key : Nav.Key
    , url : Url
    }


initialModel :  Url -> Nav.Key -> Model
initialModel  url key =
    { cats = []
    , showLoading = True
    , showModal = False
    , key = key
    , url = url
    }


type alias Cat =
    { id : String
    , url : String
    , width : Int
    , height : Int
    }



-- type alias AppStatus =
--   {
--     msg : String
--     ,isModalOpen : Bool
--     ,modalVisibility : Modal.Visibility
--   }
-- initialAppStatus : AppStatus
-- initialAppStatus =
--   { msg = "Loading Cats"
--   , isModalOpen = False
--   ,modalVisibility= Modal.hidden
--   }
-- init : () -> (Model, Cmd Msg)
-- init _=
--   (Loading , getCatList )


init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( initialModel url key, getCatList )


api_key =
    "1197d305-e0e8-4bca-add4-bd778f68c21b"



-- UPDATE


type Msg
    = MorePlease
    | Loading
    | GotList (Result Http.Error (List Cat))
    | ToggleModal
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
                    ( { model | showLoading=False, cats = catlist }, Cmd.none )

                Err _ ->
                    ( { model | cats = [] }, Cmd.none )

        ToggleModal ->
            ( { model | showModal = not model.showModal }, Cmd.none )

        ClickedLink urlRequest ->
            case urlRequest of
                Browser.Internal _ ->
                    ( model, Cmd.none )

                Browser.External url ->
                    ( model, Nav.load url )

        ChangedUrl url ->
            ( model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- VIEW


view : Model -> Document Msg
view model =
    if model.showLoading then
        { title = "Cats"
        , body =
            [ div [] [text "Loading"]]
        }

    else
        { title = "Cats"
        , body =
            [ div []
                [ ul [] (List.map renderImages model.cats)
                , button [ onClick MorePlease ] [ text "More please" ]
                , modalView model.showModal
                ]
            ]
        }


modalView : Bool -> Html Msg
modalView show =
    let
        modal =
            if show then
                [ Html.Attributes.class "modal" ]

            else
                [ Html.Attributes.class "modal", Html.Attributes.class "off" ]
    in
    div modal []
        -- [ Html.button [ Html.Attributes.class "close", onClick ToggleModal ] [ text "x" ]
        -- , Html.form [ Html.Attributes.id "contactModal", Html.Attributes.method "post", Html.Attributes.action "/process.php" ]
        --     [ Html.input [ Html.Attributes.required True, Html.Attributes.placeholder "Name", Html.Attributes.type_ "text", Html.Attributes.name "name" ] []
        --     , Html.input [ Html.Attributes.required True, Html.Attributes.placeholder "Email", Html.Attributes.type_ "email", Html.Attributes.name "email" ] []
        --     , Html.textarea [ Html.Attributes.required True, Html.Attributes.placeholder "Message", Html.Attributes.spellcheck True, Html.Attributes.rows 4, Html.Attributes.name "message" ] []
        --     , Html.img [ Html.Attributes.class "img-verify", Html.Attributes.src "/image.php", Html.Attributes.width 80, Html.Attributes.height 30 ] []
        --     , Html.input [ Html.Attributes.id "verify", Html.Attributes.autocomplete False, Html.Attributes.required True, Html.Attributes.placeholder "Copy the code", Html.Attributes.type_ "text", Html.Attributes.name "verify", Html.Attributes.title "This confirms you are a human user or strong AI and not a spam-bot." ] []
        --     , div [ Html.Attributes.class "center" ]
        --         [ Html.input [ Html.Attributes.type_ "submit", Html.Attributes.value "Send Message" ] []
        --         , div [ Html.Attributes.id "response" ] []
        --         ]
        --     ]
        -- ]


renderImages : Cat -> Html Msg
renderImages lst =
    li [ style "list-style" "none" ]
        [ div [ onClick <| ToggleModal ]
            [ img [ src lst.url, width 300 ] []
            ]
        ]



-- [text lst.url]
-- viewGif : Model -> Html Msg
-- viewGif model =
--   case model of
--     Failure ->
--       div []
--         [ text "I could not load the catz for some reason. "
--         , button [ onClick MorePlease ] [ text "Try Again!" ]
--         ]
--     Loading ->
--       text "Loading..."
--     Success catlist ->
--       div []
--         [ul [] (List.map renderImages catlist)
--         ,button [ onClick MorePlease ] [ text "More please" ]
--         ]
--     ToggleModal ->
-- viewModal : AppStatus -> Html Msg
-- viewModal model =
--     Modal.config CloseModal
--           |> Modal.small
--           |> Modal.body []
--               [text "body"]
--           |> Modal.view model.modalVisibility
-- HTTP


getCatList : Cmd Msg
getCatList =
    let
        headers =
            [ Http.header "x-api-key" api_key ]
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


catItemDecoder : Decoder Cat
catItemDecoder =
    JD.map4 Cat
        (field "id" string)
        (field "url" string)
        (field "width" int)
        (field "height" int)


catListDecoder : Decoder (List Cat)
catListDecoder =
    JD.list catItemDecoder
