import React from "react"
import { Link } from "react-router-dom"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { useSliderStyles } from "./Slider.styles"

function Slide({ slide }) {
  const classes = useSliderStyles({ slideBg: slide.url })
  return (
    <div className={classes.sliderImage}></div>
  )
} 

function Slider({ slides = [], pathPrefix }) {
  const classes = useSliderStyles({})
  return (
    <div className={classes.slider}>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        showIndicators={true}
      >
        {slides.map(slide => (
          <Link
            key={slide.id}
            to={{
              pathname: `/${pathPrefix}/${slide.id}`,
            }}
          >
            <Slide slide={slide} />
          </Link>
        ))}
      </Carousel>
    </div>
  )
}

export default Slider