import { createUseStyles } from "react-jss"

export const useListItemStyles = createUseStyles({
  linkWrapper: {
    height: "100%"
  },
  link: {
    display: "block",
    position: "relative",
    height: "250px",
    boxShadow: "4px 5px 3px 0px rgb(0 0 0 / 30%)"
  }
})