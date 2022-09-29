import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import Grid from '../components/Grid'
import CatContext from '../context/CatContext'

export default function Cats() {
  const { catData, setCatData } = useContext(CatContext)
  const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_8YyLRW15hH59CsNQzXX43v3tIvVE2cMJYLYNGGOvBRJedFvsY8J3oCiliQnuMSoO`

  useEffect(() => {
    fetchData(apiUrl)
      .then((catArray) => setCatData((prev) => [...prev, ...catArray]))
      .catch((error) => console.error(error))
  }, [apiUrl, setCatData])

  const handleLoadMore = (url) => {
    fetchData(url)
      .then((catArray) => setCatData((prev) => [...prev, ...catArray]))
      .catch((error) => console.error(error))
  }

  return (
    <div>
      {catData.length !== 0 && <Grid catData={catData} />}
      <button onClick={() => handleLoadMore(apiUrl)}>Load more</button>
    </div>
  )
}

function fetchData(url) {
  return axios
    .get(url)
    .then((res) => {
      return res.data
    })
    .catch((err) => console.error(err))
}
