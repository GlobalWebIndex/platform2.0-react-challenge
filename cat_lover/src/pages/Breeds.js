import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'
import BreedOptionList from '../components/BreedOptionList'

function Breeds() {
  const [isLoading, setIsLoading] = useState(true)
  const [breedData, setBreedData] = useState([])

  useEffect(() => {
    fetchData()
      .then((breeds) => {
        setBreedData(breeds)
        setIsLoading(false)
      })
      .catch((error) => console.error(error))
  }, [])

  if (isLoading)
    return (
      <div className='min-h-[90vh] h-full bg-[#363636]  flex justify-center items-center'>
        <Loading />
      </div>
    )

  return (
    <div className='min-h-[90vh] h-full bg-[#363636]  flex justify-center pt-20'>
      <BreedOptionList breedData={breedData} />
    </div>
  )
}

function fetchData() {
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`, {
      'x-api-key':
        'live_8YyLRW15hH59CsNQzXX43v3tIvVE2cMJYLYNGGOvBRJedFvsY8J3oCiliQnuMSoO',
    })
    .then((res) => {
      console.log('Breeds', res.data)
      return res.data
    })
    .catch((err) => console.error(err))
}

export default Breeds
