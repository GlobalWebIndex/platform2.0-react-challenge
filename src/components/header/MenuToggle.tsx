import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import { FC } from 'react'

type MenuToggleProps = {
  onToggle: () => void
  isOpen: boolean
}

const MenuToggle: FC<MenuToggleProps> = ({ onToggle, isOpen }) => (
  <Box display={{ base: 'block', md: 'none' }} onClick={onToggle}>
    {isOpen ? <CloseIcon /> : <HamburgerIcon />}
  </Box>
)

export default MenuToggle
