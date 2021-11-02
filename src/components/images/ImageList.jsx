import React, { useCallback, useEffect, useState, useRef } from "react"
import { fetchData } from '../../util'
import { IMAGES_REQUEST_PATH } from "../../constants"
import { List } from "../common"
import { PageTitle } from "../layout"
import ImageListItem from "./ImageListItem"
import LoadMore from "./LoadMore"

function ImageList() {
  const [images, setImages] = useState([])
  const [dataPage, setDataPage] = useState(1)
  // This reference is used to avoid memory leaks on updating
  // state to unmounted components.
  const isMountedVal = useRef(1);
  const clickHandler = useCallback(() => {
    setDataPage(dataPage + 1)
  }, [dataPage])

  const getImageData = async () => {
    const imageData = await fetchData({ 
      dataKey: "images",
      requestRoute: IMAGES_REQUEST_PATH,
      requestParams: `limit=10&page=${dataPage}`,
      page: dataPage
    })
    isMountedVal.current && setImages(Object.values(imageData))
  }

  useEffect(() => {
    isMountedVal.current = 1;
		getImageData()

		return () => {
      isMountedVal.current = 0
    }
  }, [dataPage])

  return (
    <>
      <PageTitle title="Images" />
      <List listItems={images} component={ImageListItem} path="image" />
      <LoadMore onClick={clickHandler} />
    </>
  )
}

export default ImageList