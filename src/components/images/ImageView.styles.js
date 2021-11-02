import { createUseStyles } from "react-jss"

export const useImageViewStyles = createUseStyles({
  imageViewWrapper: {
    maxWidth : "400px",
    margin: [40, 'auto'],
    font: "15px/18px Helvetica"
  },
  image: {
    width : "100%"
  }
})