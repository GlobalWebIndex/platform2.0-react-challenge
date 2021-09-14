import { Flex, Stack } from '@chakra-ui/react'
import { FC, useState } from 'react'
import Logo from './Logo'
import MenuLinks from './MenuLinks'
import MenuToggle from './MenuToggle'

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <Flex as='nav' align='center' justify='space-between' w='100%' mb={8} p={8} bg={['primary.500']} color={['primary.700']}>
      <Stack spacing={8} align='baseline' direction='row'>
        <Logo />
        <MenuLinks isOpen={isOpen} />
        <MenuToggle isOpen={isOpen} onToggle={toggleMenu} />
      </Stack>
    </Flex>
  )
}

export default Header
