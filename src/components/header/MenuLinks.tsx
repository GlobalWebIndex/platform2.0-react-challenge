import { Stack } from '@chakra-ui/react'
import { FC } from 'react'
import MenuItem from './MenuItem'

const MenuLinks: FC = () => (
  <Stack spacing={8} align='center' direction={['row', 'row', 'row', 'row']}>
    <MenuItem to='/cats'>Cats</MenuItem>
    <MenuItem to='/breeds'>Breeds</MenuItem>
    <MenuItem to='/favorites'>Favorites</MenuItem>
  </Stack>
)

export default MenuLinks
