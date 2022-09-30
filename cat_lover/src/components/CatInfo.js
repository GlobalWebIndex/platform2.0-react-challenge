import React from 'react'
import StarLine from './StarLine'

function CatInfo({ breeds }) {
  if (breeds.length === 0) {
    return <div>There is no data for this cat</div>
  }
  return (
    <div>
      <h1>{breeds[0].name}</h1>
      <p>{breeds[0].description}</p>
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />{' '}
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
      <StarLine name='adaptability' score={breeds[0].adaptability} />
    </div>
  )
}

export default CatInfo
