import React from 'react'

function Grid({ catData }) {
  return (
    <div>
      {catData.map((cat, i) => (
        <img
          key={cat.id}
          alt='cat'
          src={cat.url}
          style={{ height: '200px', width: '200px' }}
        />
      ))}
    </div>
  )
}

export default Grid
