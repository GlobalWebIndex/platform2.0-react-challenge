import { FC } from 'react'

type CatProps = {
  index: number
  id: string
  url: string
  width: number
  onClick: () => void
}

const Cat: FC<CatProps> = ({ index, id, url, width, onClick }) => {
  const imageWidth = width > 400 ? 400 : width
  return (
    <div role='button' onClick={onClick} onKeyDown={onClick} tabIndex={index}>
      <li key={id}>
        <img loading='lazy' src={url} alt='a cat' width={imageWidth} />
      </li>
    </div>
  )
}

export default Cat
