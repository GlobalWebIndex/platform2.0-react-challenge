import { Button, Center } from '@chakra-ui/react'
import { FC } from 'react'

type LoadMoreButtonProps = {
  onClick: () => void
}

const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  children = 'Load more',
  onClick,
}) => (
  <Center>
    <Button
      mt={5}
      size='sm'
      colorScheme='teal'
      variant='ghost'
      onClick={onClick}
    >
      {children}
    </Button>
  </Center>
)

export default LoadMoreButton
