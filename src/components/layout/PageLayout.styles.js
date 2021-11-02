import { createUseStyles } from "react-jss"
import { breakpoints, mediaBreakpointUp } from "../../util"

export const usePageLayoutStyles = createUseStyles({
  pageLayout: {
    display: "grid",
  },
  menuWrapper: {
    display: "grid",
    position: "relative",

    [mediaBreakpointUp(breakpoints.md)]: {
      justifySelf: "end",
    },
  },
  contentWrapper: {},
})
