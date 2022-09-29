import React, { useContext } from 'react'
import { BsHeartFill } from 'react-icons/bs'
import CatContext from '../context/CatContext'

function CatBox({ url, id }) {
  const { favoriteCats, setFavoriteCats } = useContext(CatContext)

  const handleClick = () => {
    if (favoriteCats.includes(id))
      setFavoriteCats((prev) => prev.filter((item) => item !== id))
    else setFavoriteCats((prev) => [...prev, id])
  }

  return (
    <div className='relative'>
      <img
        src={url}
        alt='cat'
        className={`h-48 w-full rounded object-cover  hover:shadow-xl hover:cursor-pointer  `}
      />
      <BsHeartFill
        size={20}
        className={`text-red-100 transition ease-in-out  absolute top-2 right-2  hover:cursor-pointer hover:scale-125 ${
          favoriteCats.includes(id) && 'text-red-500'
        }`}
        onClick={() => handleClick()}
      />
    </div>
  )
}

export default CatBox
