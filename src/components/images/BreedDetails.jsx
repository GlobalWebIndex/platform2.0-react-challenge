import React from "react"
import { Link } from "react-router-dom"
import { useBreedDetailsStyles } from "./BreedDetails.styles"

function BreedDetails({ breed }) {
  const classes = useBreedDetailsStyles()
  return (
    <div className={classes.breedDetails}>
      <div className={classes.detailsRow}>
        <span className={classes.label}>Breed:</span>
        <Link 
          className={classes.breed}
          to={{
            pathname: `/breed/${breed.id}`,
            state: {}
          }}
        >
          {breed.name}
        </Link>
      </div>
      <div className={classes.detailsRow}>
        <span className={classes.label}>Origin:</span>
        <span>{breed.origin}</span>
      </div>
      <div className={classes.detailsRow}>
        <span className={classes.label}>Life Span:</span>
        <span>{breed.life_span}</span>
      </div>
      <div className={classes.detailsRow}>
        <span>{breed.description}</span>
      </div>
    </div>
  )
}

export default BreedDetails