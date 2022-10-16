export const sharedStyles = {
  padding: "20px",
  backgroundColor: "#DFD3C3",
  height: "100%", // so that scrollbar appears when it reaches the bottom
  overflow: "auto",
  borderRadius: "30px 0px 0px 30px", // top right - bottom right have no border radius
};

export const sharedClasses = {
  link: {
    textDecoration: "none",
    width: "100%",
  },
  loverColor: {
    color: "#6C5D72",
  },
  textColor: {
    color: "#7D6E83",
    fontWeight: "bold",
  },
  title: {
    color: "#7D6E83",
    cursor: "pointer",
    "&:hover": {
      color: "#ACA090",
      "& > :first-child": {
        color: "#8A7E6E",
      },
    },
  },
};
