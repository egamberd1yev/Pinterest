import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSettings, FiShare2 } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import PinCard from '../components/PinCard'
import api from '../service/api'

const tabs = ['Yaratilgan', 'Saqlangan', 'Doskalar']

export default function ProfilePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Yaratilgan')
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await api.get('/user/me')
        console.log('User:', userRes.data)  // backend nima qaytarishini ko'rish uchun
        setUser(userRes.data)

        const pinsRes = await api.get('/image/my')
        console.log('Pinlar:', pinsRes.data)
        setPins(pinsRes.data)
      } catch (err) {
        console.error('Xato:', err.response?.status, err.response?.data)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const initial = user?.username?.charAt(0).toUpperCase() || '?'

  return (
    <div>
      <Navbar />

      <div className="flex flex-col items-center py-8 px-4">
        <div className="w-24 h-24 rounded-full bg-[#E60023] flex items-center justify-center text-white text-3xl font-bold mb-4">
          {initial}
        </div>

        <h1 className="text-2xl font-semibold text-gray-900">
          {user?.username ?? 'Yuklanmoqda...'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {user?.email ?? ''}
        </p>

        <div className="flex gap-8 mt-4">
          <div className="text-center">
            <p className="font-semibold text-gray-900">{pins.length}</p>
            <p className="text-xs text-gray-500">Pinlar</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">1.2K</p>
            <p className="text-xs text-gray-500">Obunachilar</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">340</p>
            <p className="text-xs text-gray-500">Obunalar</p>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button className="px-5 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            Profilni tahrirlash
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <FiShare2 className="text-gray-700" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <FiSettings className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="flex justify-center border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${
              activeTab === tab
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-10 h-10 border-4 border-[#E60023] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-4">
          {activeTab === 'Yaratilgan' && (
            pins.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-16 gap-3">
                <span className="text-5xl">📌</span>
                <p className="text-gray-400">Hali pinlar yo'q</p>
                <button
                  onClick={() => navigate('/upload')}
                  className="px-6 py-2.5 bg-[#E60023] text-white rounded-full text-sm font-medium hover:bg-[#c0001d]"
                >
                  Pin yaratish
                </button>
              </div>
            ) : (
              <div style={{ columnCount: 4, columnGap: '12px' }}>
                {pins.map(pin => <PinCard key={pin.id} pin={pin} />)}
              </div>
            )
          )}

          {activeTab === 'Saqlangan' && (
            <div className="flex flex-col items-center justify-center mt-16 gap-3">
              <span className="text-5xl">🔖</span>
              <p className="text-gray-400">Saqlangan pinlar yo'q</p>
            </div>
          )}

          {activeTab === 'Doskalar' && (
            <div className="flex flex-col items-center justify-center mt-16 gap-3">
              <span className="text-5xl">🗂️</span>
              <p className="text-gray-400">Doskalar yo'q</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}