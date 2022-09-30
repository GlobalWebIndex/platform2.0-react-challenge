import React, { useContext } from 'react'
import { BsHeartFill } from 'react-icons/bs'
import CatContext from '../context/CatContext'

function CatBox({ url, id, openModal }) {
  const { favoriteCats, setFavoriteCats } = useContext(CatContext)

  const handleClick = () => {
    if (favoriteCats.includes(id))
      setFavoriteCats((prev) => prev.filter((item) => item !== id))
    else setFavoriteCats((prev) => [...prev, id])
  }

  return (
    <div className='relative transition ease-in-out hover:scale-105'>
      <img
        src={url}
        alt='cat'
        className={`h-48 w-full rounded object-cover shadow-lg hover:shadow-xl hover:cursor-pointer  `}
        onClick={openModal}
      />
      <BsHeartFill
        size={20}
        className={`text-red-100 transition ease-in-out  absolute top-2 right-2  hover:cursor-pointer hover:scale-125 ${
          favoriteCats.includes(id) && 'text-red-500 z-10'
        }`}
        onClick={() => handleClick()}
      />
    </div>
  )
}

export default CatBox
