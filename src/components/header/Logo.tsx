import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'

const Logo: FC = () => (
  <Box>
    <Text data-cy='app-logo' fontSize='lg' fontWeight='bold'>
      The Cat App
    </Text>
  </Box>
)

export default Logo
