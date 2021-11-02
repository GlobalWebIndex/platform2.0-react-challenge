import { createUseStyles } from "react-jss"
import { breakpoints, mediaBreakpointUp } from "../../util/"

export const useListStyles = createUseStyles({
  list: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridColumnGap: "10px",
    gridRowGap: "10px",
    alignItems: "center",

    [mediaBreakpointUp(breakpoints.sm)]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },

    [mediaBreakpointUp(breakpoints.md)]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  }
})