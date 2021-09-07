type CatProps = {
  id: string
  url: string
  width: number
}

function Cat({ id, url, width }: CatProps) {
  const imageWidth = width > 400 ? 400 : width
  return (
    <li key={id}>
      <img loading='lazy' src={url} alt='a cat' width={imageWidth} />
    </li>
  )
}

export default Cat
