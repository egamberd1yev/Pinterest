import {
  Flex, Input, IconButton, Text, Box
} from '@chakra-ui/react'
// InputGroup o'rniga v3 da InputGroup elementi mana shunday import qilinadi
import { InputGroup } from '../components/ui/' 
// Avatar snippetidan foydalanamiz (agar snippet ochmagan bo'lsangiz, quyidagi Avatar qo'llanmasiga qarang)
import { Avatar } from '../components/ui/avatar' 
import { FiSearch, FiBell } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <Flex
      px={4} py={3} align="center" gap={3}
      borderBottom="1px solid" borderColor="gray.200"
      position="sticky" top={0} zIndex={10} bg="white"
    >
      {/* Logo */}
      <Text fontSize="3xl" color="#E60023" cursor="pointer" onClick={() => navigate('/')}>
        📌
      </Text>

      {/* Bosh sahifa tugmasi */}
      <Text
        fontWeight="600" px={4} py={2} borderRadius="full"
        bg="gray.900" color="white" cursor="pointer" fontSize="sm"
      >
        Bosh sahifa
      </Text>

      {/* Yaratish tugmasi */}
      <Text
        fontWeight="600" px={4} py={2} borderRadius="full"
        color="gray.600" cursor="pointer" fontSize="sm"
        _hover={{ bg: 'gray.100' }}
        onClick={() => navigate('/upload')}
      >
        Yaratish
      </Text>

      {/* Qidiruv qismi (Chakra v3 InputGroup) */}
      <Box flex={1}>
        <InputGroup startElement={<FiSearch color="gray" />} w="full">
          <Input
            placeholder="Qidirish..."
            borderRadius="full"
            bg="gray.100"
            border="none"
            _focus={{ bg: 'white', border: '1px solid', borderColor: 'gray.300' }}
          />
        </InputGroup>
      </Box>

      {/* Bildirishnoma tugmasi (v3 da icon prop o'rniga children) */}
      <IconButton
        borderRadius="full"
        variant="ghost"
        aria-label="Bildirishnomalar"
      >
        <FiBell />
      </IconButton>

      {/* Profil rasmi (Avatar) */}
      <Avatar
        size="sm"
        fallback="U" // Foydalanuvchi ismi bosh harfi (User)
        cursor="pointer"
        onClick={() => navigate('/profile')}
      />
    </Flex>
  )
}