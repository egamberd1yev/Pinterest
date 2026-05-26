import { Box, Text, Spinner, Center } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

export default function HomePage() {
  return (
    <Box>
      <Navbar />
      <Center mt={10}>
        <Text fontSize="xl">Bosh sahifa ishlayapti! ✅</Text>
      </Center>
    </Box>
  )
}