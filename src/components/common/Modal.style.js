import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles({
  modalContainer: {
    position: "fixed",
    zIndex: "10",
    inset: 0,
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.8)",
    zIndex: "1",
  },
  modalContent: {
    zIndex: "2",
    border: "1px solid #000",
    padding: 0,
    boxShadow: "5px 5px 10px -3px #000",
    background: "#444",
    color: "#fff",
    position: "fixed",
    top: 20,
    // The max height of the modal is the full viewport height - 20px (top rule) - 20px (from bottom)
    maxHeight: "calc(100vh - 40px)",
    overflowY: "auto",
    width: "85%",
    // Horizontally center
    left: "50vw",
    transform: "translateX(-50%)",
  },
  modalCloseButton: {
    position: "absolute",
    top: 5,
    right: 10,
    background: "#fff",
    border: "1px solid #000",
    boxShadow: "0px 0px 10px 1px #737373",
    padding: [7, 10],
    cursor: "pointer",
    borderRadius: 17,
  },
});
