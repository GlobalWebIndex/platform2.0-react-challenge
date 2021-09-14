import { Box, Stack } from '@chakra-ui/react'
import { FC } from 'react'
import MenuItem from './MenuItem'

type MenuLinksProps = {
  isOpen: boolean
}

const MenuLinks: FC<MenuLinksProps> = ({ isOpen }) => (
  <Box display={{ base: isOpen ? 'block' : 'none', md: 'block' }}>
    <Stack spacing={8} align='center' direction={{ base: 'column', md: 'row' }}>
      <MenuItem to='/cats'>Cats</MenuItem>
      <MenuItem to='/breeds'>Breeds</MenuItem>
      <MenuItem to='/favorites'>Favorites</MenuItem>
    </Stack>
  </Box>
)

export default MenuLinks
