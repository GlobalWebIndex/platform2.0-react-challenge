import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Html.Attributes exposing (style)
import Json.Decode as JD exposing (Decoder, map2, field, string, int ,list)
import Bootstrap.Modal as Modal
import Bootstrap.Button as Button
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Row as Row
import Bootstrap.Grid.Col as Col

-- MAIN


main =
 Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- MODEL


type Model
  = Failure
  | Loading
  | Success (List Cat) 
  | ToggleModal



type alias Cat =
  { id : String
    ,url: String
    ,width: Int
    ,height: Int
  }

type alias AppStatus =
  {
    msg : String
    ,isModalOpen : Bool
    ,modalVisibility : Modal.Visibility
  }

initialAppStatus : AppStatus
initialAppStatus =
  { msg = "Catz"
  , isModalOpen = False
  ,modalVisibility= Modal.hidden
  }

init : () -> (Model, Cmd Msg)
init _=
  (Loading , getCatList )


api_key = "bdb0f0b8-7f00-4e07-a6e9-e06c10f8bc63"
-- UPDATE


type Msg
  = MorePlease
  | GotList (Result Http.Error (List Cat))
  | CloseModal
  | ShowModal


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    MorePlease ->
      (Loading, getCatList)

    GotList result ->
      case result of
        Ok catlist ->
          (Success catlist, Cmd.none)

        Err _ ->
                (Failure, Cmd.none)

    CloseModal ->
        ( model , Cmd.none)
        -- ( { model | modalVisibility = Modal.hidden } , Cmd.none )
    ShowModal ->
        ( ToggleModal, Cmd.none)
        -- ( { model | modalVisibility = Modal.shown } , Cmd.none )



      -- handle error message


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ h1 [] [ text "Cute catz list" ]
    , viewGif model
    -- , Button.button 
    --         [ Button.outlineSuccess
    --         , Button.attrs [ onClick <| ShowModal ] ]
    --     [ text "Open modal"]
    ]
    

renderImages : Cat -> Html Msg
renderImages lst =
      li[ (style "list-style" "none") ]
      [
      div [ onClick <| ShowModal ] [
      img [src lst.url , width 300 ] [] ]
      ]-- [text lst.url]

viewGif : Model -> Html Msg
viewGif model =
  case model of
    Failure ->
      div []
        [ text "I could not load the catz for some reason. "
        , button [ onClick MorePlease ] [ text "Try Again!" ]
        ]
    Loading ->
      text "Loading..."

    Success catlist ->
      div []
        [ul [] (List.map renderImages catlist)
        ,button [ onClick MorePlease ] [ text "More Catz please" ]
        ]



viewModal : AppStatus -> Html Msg
viewModal model =
    Modal.config CloseModal
          |> Modal.small
          |> Modal.body []
              [text "body"]
          |> Modal.view model.modalVisibility

-- HTTP

getCatList : Cmd Msg
getCatList =
  let headers  = [ Http.header "x-api-key" api_key ]
  in
  Http.request
    { body = Http.emptyBody
    , method="GET"
    , url = "https://api.thecatapi.com/v1/images/search?limit=10"
    , expect = Http.expectJson GotList catListDecoder
    , headers = headers
    , timeout = Nothing
    , tracker = Nothing
  }

catItemDecoder: Decoder Cat
catItemDecoder =
  JD.map4 Cat
    (field "id" string)
    (field "url" string)
    (field "width" int)
    (field "height" int)

catListDecoder: Decoder (List Cat)
catListDecoder =
  JD.list catItemDecoder
