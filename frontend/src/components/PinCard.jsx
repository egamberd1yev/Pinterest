import { Box, Text, Avatar, Flex, Button } from '@chakra-ui/react'
import { useState } from 'react'

export default function PinCard({ pin }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      cursor="pointer"
      position="relative"
      mb={3}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box position="relative">
        <img
          src={`http://localhost:5000/${pin.filepath}`}
          alt={pin.title}
          style={{ width: '100%', display: 'block', borderRadius: '16px' }}
        />

        {hovered && (
          <Box
            position="absolute" top={0} left={0} right={0} bottom={0}
            bg="blackAlpha.300" borderRadius="xl"
          >
            <Button
              position="absolute" top={3} right={3}
              bg="#E60023" color="white" borderRadius="full"
              size="sm" _hover={{ bg: '#c0001d' }}
            >
              Saqlash
            </Button>
          </Box>
        )}
      </Box>

      <Box px={2} py={2}>
        {pin.title && (
          <Text fontWeight="600" fontSize="sm" noOfLines={2}>
            {pin.title}
          </Text>
        )}
        <Flex align="center" gap={2} mt={1}>
          <Avatar size="xs" bg="#E60023" />
          <Text fontSize="xs" color="gray.500">
            {pin.user?.username || 'Foydalanuvchi'}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}