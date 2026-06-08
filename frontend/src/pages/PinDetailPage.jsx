import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiShare2, FiMoreHorizontal, FiDownload, FiTrash2 } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import api from '../service/api'

export default function PinDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pin, setPin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const menuRef = useRef(null)
  // Tizimga kirgan user
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const res = await api.get(`/image/${id}`)
        // console.log('ping users:'. res.data.users);
        // console.log('full pin data:', res.data)  // ✅ shu qatorni qo'shing
        // console.log('pin.user:', res.data.user)
        // console.log('currentUser:', currentUser)
        // console.log('isOwner:', isOwner)
        setPin(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPin()
  }, [id])

  // Menudan tashqari bossa yopiladi
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleDelete = async () => {
    if (!window.confirm('Rasmni o\'chirishni xohlaysizmi?')) return
    setDeleting(true)
    try {
      await api.delete(`/image/${id}`)
      navigate(-1)
    } catch (err) {
      alert('O\'chirishda xato: ' + err.message)
    } finally {
      setDeleting(false)
    }
  }

  const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: pin.title || 'Pin',
        text: pin.description || '',
        url: window.location.href,
      })
    } catch (err) {
      // user bekor qildi
    }
  } else {
    navigator.clipboard.writeText(window.location.href)
    alert('Link nusxalandi!')
  }
}

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

  // O'z rasimi ekanligini tekshirish
 const isOwner = currentUser?.id && pin.user?.id &&
  String(currentUser.id) === String(pin.user.id)

  return (
    <div>
      <Navbar search="" onSearch={() => {}} onSubmit={() => {}} />
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
              <div className="flex gap-2 items-center">

                {/* 3 nuqta — dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    <FiMoreHorizontal className="text-gray-700" />
                  </button>

                  {menuOpen && (
                    <div className="absolute left-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 min-w-[160px]">
                      {isOwner ? (
                        <button 
                          onClick={handleShare}
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                        >
                          <FiShare2 className="text-gray-700" />
                        </button>
                      ) : (
                        <div className="px-4 py-2.5 text-gray-400 text-sm">
                          Amallar yo'q
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
                  <FiShare2 className="text-gray-700" />
                </button>
                <a
                  href={imageUrl}
                  download={pin.filename}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                >
                  <a href={`http://localhost:5000/api/image/${pin.id}/download`}>
                    <FiDownload />
                  </a>
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
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
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
              {!isOwner && (
                <button className="ml-auto px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                  Obuna bo'lish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}