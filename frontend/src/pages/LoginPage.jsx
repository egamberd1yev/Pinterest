import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../App'
import api from '../service/api'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [activeTab, setActiveTab] = useState('login')
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/user/login', loginData)
      login(res.data.accessToken)
      localStorage.setItem('refreshToken', res.data.refreshToken)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Xato yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.post('/user/register', registerData)
      // Register qilgach avtomatik login
      const res = await api.post('/user/login', {
        username: registerData.username,
        password: registerData.password
      })
      login(res.data.accessToken)
      localStorage.setItem('refreshToken', res.data.refreshToken)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Xato yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Chap tomon - qizil panel */}
      <div className="hidden md:flex flex-1 bg-[#E60023] flex-col items-center justify-center p-10">
        <span className="text-7xl">📌</span>
        <h1 className="text-3xl font-bold text-white text-center mt-4">
          Ilhom olish, saqlash va ulashish
        </h1>
        <p className="text-white/75 mt-3 text-center">
          Dunyodagi eng yaxshi g'oyalar shu yerda
        </p>
        <div className="grid grid-cols-2 gap-2 mt-8 w-44">
          <div className="h-20 bg-white/20 rounded-xl"></div>
          <div className="h-14 bg-white/20 rounded-xl"></div>
          <div className="h-14 bg-white/20 rounded-xl"></div>
          <div className="h-20 bg-white/20 rounded-xl"></div>
        </div>
      </div>

      {/* O'ng tomon - forma */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 bg-white">
        <span className="text-5xl mb-6">📌</span>

        {/* Tablar */}
        <div className="flex bg-gray-100 rounded-xl p-1 w-full max-w-sm mb-6">
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'login' ? 'bg-[#E60023] text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => { setActiveTab('login'); setError('') }}
          >
            Kirish
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'register' ? 'bg-[#E60023] text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => { setActiveTab('register'); setError('') }}
          >
            Ro'yxat
          </button>
        </div>

        {/* Xato xabari */}
        {error && (
          <div className="w-full max-w-sm mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        <div className="w-full max-w-sm">

          {/* Login */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Foydalanuvchi nomi
                </label>
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="username"
                  value={loginData.username}
                  onChange={e => setLoginData({ ...loginData, username: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E60023]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Parol
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E60023]"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#E60023] text-white rounded-full font-medium hover:bg-[#c0001d] transition-colors disabled:opacity-60"
              >
                {loading ? 'Kirish...' : 'Kirish'}
              </button>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-400">yoki</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <button
                type="button"
                className="w-full py-2.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                G — Google bilan kirish
              </button>
              <p className="text-sm text-gray-500 text-center underline cursor-pointer">
                Parolni unutdingizmi?
              </p>
            </form>
          )}

          {/* Register */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Foydalanuvchi nomi
                </label>
                <input
                  type="text"
                  autoComplete="username"
                  placeholder="username"
                  value={registerData.username}
                  onChange={e => setRegisterData({ ...registerData, username: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E60023]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="email@example.com"
                  value={registerData.email}
                  onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E60023]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Parol
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  value={registerData.password}
                  onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E60023]"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#E60023] text-white rounded-full font-medium hover:bg-[#c0001d] transition-colors disabled:opacity-60"
              >
                {loading ? 'Yuklanmoqda...' : "Ro'yxatdan o'tish"}
              </button>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-400">yoki</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              <button
                type="button"
                className="w-full py-2.5 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                G — Google bilan kirish
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  )
}