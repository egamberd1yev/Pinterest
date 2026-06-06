import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiShare2, FiMoreHorizontal, FiDownload } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import api from '../service/api'

export default function PinDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pin, setPin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const res = await api.get(`/image/${id}`)
        console.log('Pin data:', res.data)
        setPin(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPin()
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-[#E60023] border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!pin) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-400">Pin topilmadi</p>
    </div>
  )

  const imageUrl = `http://localhost:5000/${pin.filepath.replace(/\\/g, '/')}`

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <FiArrowLeft /> Orqaga
        </button>

        <div className="flex gap-8 bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Chap — rasm */}
          <div className="w-1/2 flex-shrink-0 bg-gray-100">
            <img
              src={imageUrl}
              alt={pin.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* O'ng — ma'lumotlar */}
          <div className="flex-1 p-8 flex flex-col">
            {/* Tugmalar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                  <FiMoreHorizontal className="text-gray-700" />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                  <FiShare2 className="text-gray-700" />
                </button>
                <a href={imageUrl}
                  download={pin.filename}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                  
                  <FiDownload className="text-gray-700" />
                </a>


              </div>
              <button className="px-5 py-2.5 bg-[#E60023] text-white rounded-full font-medium hover:bg-[#c0001d] transition-colors">
                Saqlash
              </button>
            </div>

            {/* Sarlavha */}
            {pin.title && (
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{pin.title}</h1>
            )}

            {/* Tavsif */}
            {pin.description && (
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{pin.description}</p>
            )}

            {/* Teglar */}
            {pin.tags && pin.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {pin.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Foydalanuvchi */}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#E60023] flex items-center justify-center text-white font-medium">
                {pin.user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {pin.user?.username || 'Foydalanuvchi'}
                </p>
                <p className="text-xs text-gray-400">Muallif</p>
              </div>
              <button className="ml-auto px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                Obuna bo'lish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}