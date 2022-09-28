import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Grid from '../components/Grid'

export default function Home() {
  const [pageNumber, setPageNumber] = useState(1)
  const [catData, setCatData] = useState([])
  let apiUrl = `https://api.thecatapi.com/v1/images/search?limit=10&page=${pageNumber}`

  useEffect(() => {
    fetchData(apiUrl)
      .then((catArray) => setCatData((prev) => [...prev, ...catArray]))
      .catch((error) => console.error(error))
  }, [apiUrl])

  return (
    <div>
      {catData.length !== 0 && <Grid catData={catData} />}

      <button onClick={(e) => setPageNumber((prev) => prev + 1)}>
        Load more
      </button>
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
