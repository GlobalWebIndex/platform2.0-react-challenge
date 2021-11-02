import React, { useState, useEffect, useCallback } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getImage } from "../../util"
import { Modal } from "../common"
import { FavouriteIcon } from "../favourites"
import BreedDetails from "./BreedDetails"
import { useImageViewStyles } from "./ImageView.styles"

function ImageView({ isModalView }) {
  const classes = useImageViewStyles()
  const { id: imageId } = useParams()
  const history = useHistory()
  const [imgViewData, setImgViewData] = useState({})
  const closeModal = useCallback(() => history.goBack(), [history])

  const getImageViewData = async (imageId) => {
    const image = await getImage(imageId)
    setImgViewData(image)
  }

  useEffect(() => {
    getImageViewData(imageId)
  }, [imageId])

  // Early return if no data available.
  if (!Object.keys(imgViewData).length) return null

  const ImageComponent = () => (
    <div className={classes.imageViewWrapper}>
      <img 
        className={classes.image}
        src={imgViewData.url} 
        alt={imgViewData.id} 
      />
      {imgViewData?.breeds?.length > 0 && 
        imgViewData.breeds.map(breed => (
          <BreedDetails key={breed.id} breed={breed} />
        ))
      }
      <FavouriteIcon imageId={imgViewData.id} />
    </div>
  )

  return (
    isModalView ? (
      <Modal closeCallback={closeModal}>
        <ImageComponent />
      </Modal>
    ) : <ImageComponent />
  )
}

export default ImageView