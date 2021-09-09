import { Text } from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'

type MenuItemProps = {
  to: string
}

const MenuItem: FC<MenuItemProps> = ({ children, to = '/' }) => (
  <Link to={to}>
    <Text display='block'>{children}</Text>
  </Link>
)

export default MenuItem
