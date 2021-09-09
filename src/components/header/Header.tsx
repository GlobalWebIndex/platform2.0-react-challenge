import { Flex, Stack } from '@chakra-ui/react'
import { FC } from 'react'
import MenuLinks from './MenuLinks'

const Header: FC = () => (
  <Flex
    as='nav'
    align='center'
    justify='space-between'
    w='100%'
    mb={8}
    p={8}
    bg={['primary.500']}
    color={['primary.700']}
  >
    <Stack spacing={8} align='center' direction={['row']}>
      <div>LOGO</div>
      <MenuLinks />
    </Stack>
  </Flex>
)

export default Header
