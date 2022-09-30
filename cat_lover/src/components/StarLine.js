import React from 'react'
import { BsFillStarFill } from 'react-icons/bs'

function StarLine({ name, score }) {
  const emptyArray = Array(score).fill('')
  return (
    <div className='flex gap-2'>
      <p>{name} </p>
      {emptyArray.map((item, i) => (
        <BsFillStarFill
          size={20}
          key={i}
          className='text-yellow-500 shadow-md'
        />
      ))}
    </div>
  )
}

export default StarLine
