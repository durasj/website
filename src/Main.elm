module Main exposing (..)

import Element exposing (Element, el, text, row, column, alignRight, fill, width, rgb255, spacing, centerY, centerX, padding)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Html.Events exposing (onClick)

main =
    Element.layout []
        home

home =
    column []
           [ header
           , myRowOfStuff
           ]

header =
    column [ width fill, centerX, spacing 16 ]
           [ text "Hi, I am Jakub"
           , text "Software Developer"
           ]

myRowOfStuff =
    row [ width fill, centerY, spacing 30 ]
        [ myElement
        , myElement
        , el [ alignRight ] myElement
        ]

myElement : Element msg
myElement =
    el
        [ Background.color (rgb255 240 0 245)
        , Font.color (rgb255 255 255 255)
        , Border.rounded 3
        , padding 30
        ]
        (text "stylish!")
