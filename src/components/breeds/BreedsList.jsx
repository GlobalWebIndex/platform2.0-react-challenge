import React, { useState, useEffect, useRef } from "react"
import { List } from "../common"
import { PageTitle } from "../layout"
import { fetchData } from "../../util"
import { BREEDS_REQUEST_PATH } from "../../constants"
import BreedListItem from "./BreedListItem"

function BreedsList() {
  const [breeds, setBreeds] = useState([])
  // This reference is used to avoid memory leaks on updating
  // state to unmounted components.
  const isMountedVal = useRef(1)
  const getBreedsData = async () => {
    const breedsData = await fetchData({ 
      dataKey: "breeds",
      requestRoute: BREEDS_REQUEST_PATH,
      requestParams: `attach_breed=0`
    })
    isMountedVal.current && setBreeds(Object.values(breedsData))
  }

  useEffect(() => {
    isMountedVal.current = 1;
    getBreedsData()

    return () => {
      isMountedVal.current = 0
    }
  }, [])

  return (
    <>
      <PageTitle title="Breeds" />
      <List listItems={breeds} component={BreedListItem} path="breed" />
    </>

  )
}

export default BreedsList