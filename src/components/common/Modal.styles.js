import { createUseStyles } from "react-jss"
import { breakpoints, mediaBreakpointUp } from "../../util/"

export const useModalStyles = createUseStyles({
  modalWrapper: {
    position: "fixed",
    zIndex: "10",
    inset: 0
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(225, 225, 225, 0.7)",
    zIndex: "1"
  },
  modal: {
    zIndex: "2",
    position: "absolute",
    top: "0",
    left: "0",
    width: "calc(100vw - 22px)",
    height: "fit-content",
    backgroundColor: "#fff",
    border: "1px solid #000",
    padding: [40, 10, 20],
    boxShadow: "5px 5px 10px -3px #000",

    [mediaBreakpointUp(breakpoints.md)]: {
      top: "20px",
      left: "50vw",
      transform: "translateX(-50%)",
      maxWidth: "70%",
      width: "auto",
      maxHeight: "80%",
      overflow: "scroll"
    },
  },
  modalCloseBtn: {
    position: "absolute",
    top: "5px",
    right: "10px",
    background: "transparent",
    border: "none",
    font: "500 30px/30px Helvetica",
    padding: 0,
    cursor: "pointer"
  }
})