import { createUseStyles } from "react-jss"

export const useBreedDetailsStyles = createUseStyles({
  breedDetails: {
    margin: [10, 0, 0],
    font: "15px/18px Helvetica"
  },
  detailsRow: {
    margin: [0, 0, 5, 0],

    "&:last-of-type": {
      margin: 0
    }
  },
  label: {
    margin: [0, 5, 0, 0],
    fontWeight: "600"
  },
  breed: {
    textDecoration: "none",
    color: "#e2b71c",

    "&:hover": {
      textDecoration: "underline"
    }
  }
})