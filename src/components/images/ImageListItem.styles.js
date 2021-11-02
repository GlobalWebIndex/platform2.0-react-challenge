import { createUseStyles } from "react-jss"

export const useImageListItemStyles = createUseStyles({
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  breedAvailable: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "red",
    position: "absolute",
    top: "10px",
    right: "10px"
  }
})