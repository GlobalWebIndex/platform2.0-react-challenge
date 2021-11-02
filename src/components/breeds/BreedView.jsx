import React, { useState, useEffect, useCallback} from "react"
import { useParams, useHistory } from "react-router-dom"
import { Modal, Slider } from "../common"
import { getBreedById } from "../../util"
import { useBreedViewStyles } from "./BreedView.styles"

function BreedView({ isModalView }) {
  const { id: breedId } = useParams()
  const classes = useBreedViewStyles()
  const history = useHistory()
  const [breedViewData, setBreedViewData] = useState({})
  const closeModal = useCallback(() => history.goBack(), [history])

  const getBreedData = async () => {
    const data = await getBreedById(breedId)
    setBreedViewData(data)
  }

  useEffect(() => {
    getBreedData()
  }, [])

  // Early return if no data available.
  if (!Object.keys(breedViewData).length) return null

  const BreedComponent = () => (
    <div className={classes.breedViewWrapper}>
      <Slider 
        slides={breedViewData.extraImages} 
        pathPrefix="image" 
      />
      <h2>{breedViewData.name}</h2>
      <div className={classes.origin}>
        {`${breedViewData.origin} (${breedViewData.country_code})`}
      </div>
      <div className={classes.row}>
        {breedViewData.description}
      </div>
      <div className={classes.row}>
        {breedViewData.temperament}
      </div>
      <div className={classes.attrs}>
        <div className={classes.attribute}>
          <div className={classes.label}>Affection Level</div>
          <div className={classes.value}>
            {`${breedViewData.affection_level}/5`}
          </div>
        </div>
        <div className={classes.attribute}>
          <div className={classes.label}>Adaptability</div>
          <div className={classes.value}>
            {`${breedViewData.adaptability}/5`}
          </div>
        </div>
        <div className={classes.attribute}>
          <div className={classes.label}>Child Friendly</div>
          <div className={classes.value}>
            {`${breedViewData.child_friendly}/5`}
          </div>
        </div>
        <div className={classes.attribute}>
          <div className={classes.label}>Health Issues</div>
          <div className={classes.value}>
            {`${breedViewData.health_issues}/5`}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    isModalView ? (
      <Modal closeCallback={closeModal}>
        {breedViewData && <BreedComponent />}
      </Modal>
    ) : <BreedComponent />
  )
}

export default BreedView