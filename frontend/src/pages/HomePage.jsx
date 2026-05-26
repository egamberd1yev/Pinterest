import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PinCard from '../components/PinCard'
import api from '../service/api'

const categories = ['Hammasi', 'Dizayn', 'Tabiat', 'Ovqat', 'Moda', 'Arxitektura', 'Hayvonlar', 'Sayohat', 'Sport', "San'at"]

export default function HomePage() {
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('Hammasi')

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const res = await api.get('/images')
        setPins(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPins()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-[#E60023] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div>
      <Navbar />

      {/* Kategoriyalar */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide border-b border-gray-100">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pin grid */}
      {pins.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-3">
          <span className="text-5xl">📌</span>
          <p className="text-gray-400 text-lg">Hali pinlar yo'q</p>
          <button
            onClick={() => {}}
            className="px-6 py-2.5 bg-[#E60023] text-white rounded-full text-sm font-medium hover:bg-[#c0001d]"
          >
            Birinchi piningizni yarating
          </button>
        </div>
      ) : (
        <div
          className="p-4"
          style={{ columnCount: 4, columnGap: '12px' }}
        >
          {pins.map(pin => (
            <PinCard key={pin.id} pin={pin} />
          ))}
        </div>
      )}

      {/* Yuklash tugmasi */}
      <button
        onClick={() => navigate('/upload')}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#E60023] text-white rounded-full flex items-center justify-center text-2xl shadow-lg hover:bg-[#c0001d] transition-colors"
      >
        +
      </button>
    </div>
  )
}