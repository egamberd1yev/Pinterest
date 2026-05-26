import { useState } from 'react'
import {
  Box, Flex, VStack, HStack, Input, Button, Text
} from '@chakra-ui/react'
import { toaster } from '../components/ui/toaster' 
import { useNavigate } from 'react-router-dom'
import api from '../service/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('login')
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await api.post('/user/login', loginData)
      localStorage.setItem('accessToken', res.data.accessToken) // To'g'rilandi: accesToken -> accessToken
      localStorage.setItem('refreshToken', res.data.refreshToken)
      
      // toaster'dan foydalanish usuli:
      toaster.create({ title: 'Xush kelibsiz!', type: 'success', duration: 2000 })
      navigate('/')
    } catch (err) {
      toaster.create({ title: err.response?.data?.message || 'Xato yuz berdi', type: 'error', duration: 3000 })
    } finally {
      loading && setLoading(false)
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    try {
      await api.post('/user/register', registerData)
      toaster.create({ title: "Ro'yxatdan o'tdingiz!", type: 'success', duration: 2000 })
      navigate('/')
    } catch (err) {
      toaster.create({ title: err.response?.data?.message || 'Xato yuz berdi', type: 'error', duration: 3000 })
    } finally {
      loading && setLoading(false)
    }
  }

  return (
    <Flex minH="100vh">
      {/* Chap tomon */}
      <Flex
        flex={1} bg="#E60023" direction="column"
        align="center" justify="center" p={10}
        display={{ base: 'none', md: 'flex' }}
      >
        <Text fontSize="6xl">📌</Text>
        <Text fontSize="3xl" fontWeight="bold" color="white" textAlign="center" mt={4}>
          Ilhom olish, saqlash va ulashish
        </Text>
        <Text fontSize="md" color="whiteAlpha.800" mt={3} textAlign="center">
          Dunyodagi eng yaxshi g'oyalar shu yerda
        </Text>
      </Flex>

      {/* O'ng tomon */}
      <Flex flex={1} direction="column" align="center" justify="center" p={8} bg="white">
        <Text fontSize="4xl" color="#E60023" mb={6}>📌</Text>

        {/* Tab tugmalari */}
        <HStack mb={6} bg="gray.100" borderRadius="xl" p={1} w="100%" maxW="380px">
          <Button
            flex={1} borderRadius="lg" size="sm"
            bg={activeTab === 'login' ? '#E60023' : 'transparent'}
            color={activeTab === 'login' ? 'white' : 'gray.600'}
            _hover={{ bg: activeTab === 'login' ? '#c0001d' : 'gray.200' }}
            onClick={() => setActiveTab('login')}
          >
            Kirish
          </Button>
          <Button
            flex={1} borderRadius="lg" size="sm"
            bg={activeTab === 'register' ? '#E60023' : 'transparent'}
            color={activeTab === 'register' ? 'white' : 'gray.600'}
            _hover={{ bg: activeTab === 'register' ? '#c0001d' : 'gray.200' }}
            onClick={() => setActiveTab('register')}
          >
            Ro'yxat
          </Button>
        </HStack>

        <Box w="100%" maxW="380px">
          {/* Login */}
          {activeTab === 'login' && (
            <VStack spacing={4}>
              <Box w="full">
                <Text fontSize="sm" mb={1} fontWeight="500">Foydalanuvchi nomi</Text>
                <Input
                  placeholder="username"
                  value={loginData.username}
                  onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                  focusBorderColor="#E60023"
                  borderRadius="xl"
                />
              </Box>
              <Box w="full">
                <Text fontSize="sm" mb={1} fontWeight="500">Parol</Text>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  focusBorderColor="#E60023"
                  borderRadius="xl"
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
              </Box>
              <Button
                w="full" bg="#E60023" color="white"
                borderRadius="full" _hover={{ bg: '#c0001d' }}
                onClick={handleLogin} loading={loading}
              >
                Kirish
              </Button>
              <HStack w="full">
                <Box flex={1} h="1px" bg="gray.200" />
                <Text fontSize="sm" color="gray.400">yoki</Text>
                <Box flex={1} h="1px" bg="gray.200" />
              </HStack>
              <Button w="full" variant="outline" borderRadius="full">
                G — Google bilan kirish
              </Button>
              <Text fontSize="sm" color="gray.500" cursor="pointer" textDecoration="underline">
                Parolni unutdingizmi?
              </Text>
            </VStack>
          )}

          {/* Register */}
          {activeTab === 'register' && (
            <VStack spacing={4}>
              <Box w="full">
                <Text fontSize="sm" mb={1} fontWeight="500">Foydalanuvchi nomi</Text>
                <Input
                  placeholder="username"
                  value={registerData.username}
                  onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
                  focusBorderColor="#E60023"
                  borderRadius="xl"
                />
              </Box>
              <Box w="full">
                <Text fontSize="sm" mb={1} fontWeight="500">Email</Text>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={registerData.email}
                  onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                  focusBorderColor="#E60023"
                  borderRadius="xl"
                />
              </Box>
              <Box w="full">
                <Text fontSize="sm" mb={1} fontWeight="500">Parol</Text>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                  focusBorderColor="#E60023"
                  borderRadius="xl"
                  onKeyDown={e => e.key === 'Enter' && handleRegister()}
                />
              </Box>
              <Button
                w="full" bg="#E60023" color="white"
                borderRadius="full" _hover={{ bg: '#c0001d' }}
                onClick={handleRegister} loading={loading}
              >
                Ro'yxatdan o'tish
              </Button>
              <HStack w="full">
                <Box flex={1} h="1px" bg="gray.200" />
                <Text fontSize="sm" color="gray.400">yoki</Text>
                <Box flex={1} h="1px" bg="gray.200" />
              </HStack>
              <Button w="full" variant="outline" borderRadius="full">
                G — Google bilan kirish
              </Button>
            </VStack>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}