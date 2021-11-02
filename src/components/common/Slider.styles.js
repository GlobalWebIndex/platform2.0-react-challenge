import { createUseStyles } from "react-jss"

export const useSliderStyles = createUseStyles({
  slider: {
    maxWidth: "400px",
    margin: [0, 0, 20, 0],

    "& .carousel.carousel-slider .control-arrow": {
      opacity: 1,
      background: "rgba(0, 0, 0, 0.7)",
    },
  },
  sliderImage: ({ slideBg }) => ({
    background: `url(${slideBg}) no-repeat center center`,
    backgroundSize: "cover",
    width: "100%",
    minWidth: "300px",
    height: "350px"
  }),
})