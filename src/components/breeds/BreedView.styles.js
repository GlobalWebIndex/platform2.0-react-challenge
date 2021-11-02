import { createUseStyles } from "react-jss"

export const useBreedViewStyles = createUseStyles({
  breedViewWrapper: {
    maxWidth : "400px",
    margin: [20, 'auto'],
    font: "15px/18px Helvetica"
  },
  origin: {
    font: "12px/15px Helvetica",
    margin: [0, 0, 10, 0]
  },
  row: {
    margin: [0, 0, 10, 0]
  },
  attrs: {
    display: "grid",
    gridRowGap: "5px"
  },
  attribute: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
  },
  label: {
    fontWeight: "bold"
  }
})