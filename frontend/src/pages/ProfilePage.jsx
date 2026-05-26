import { Box, Text } from '@chakra-ui/react'
import Navbar from '../components/Navbar'

export default function ProfilePage() {
  return (
    <Box>
      <Navbar />
      <Text p={8}>Profil sahifasi</Text>
    </Box>
  )
}