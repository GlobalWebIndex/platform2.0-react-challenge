import { createUseStyles } from "react-jss"

export const useBreedListItemStyles = createUseStyles({
  listItem: {
    position: "relative",
    height: "inherit",
    background: "#eee"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: "0.4",
  },
  breedName: {
    position: "absolute",
    bottom: 0,
    left: 0,
    background: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    width: "100%",
    textAlign: "center",
    font: "18px/25px Helvetica",
    padding: [10, 0]
  }
})