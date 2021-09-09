import { FC } from 'react'

type CatProps = {
  index: number
  url: string
  width: number
  onClick: () => void
}

const Cat: FC<CatProps> = ({ index, url, width, onClick }) => {
  const imageWidth = width > 400 ? 400 : width
  return (
    <div role='button' onClick={onClick} onKeyDown={onClick} tabIndex={index}>
      <li>
        <img loading='lazy' src={url} alt='a cat' width={imageWidth} />
      </li>
    </div>
  )
}

export default Cat
