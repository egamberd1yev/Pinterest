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
  const [showDeleteModal, setShowDeleteModal] = useState(false) // Custom modal uchun state
  const menuRef = useRef(null)
  
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    const fetchPin = async () => {
      try {
        const res = await api.get(`/image/${id}`)
        setPin(res.data)
      } catch (err) {
        console.error("Pin yuklashda xatolik:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchPin()
  }, [id])

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Haqiqiy o'chirish amali (modal ichida "O'chirish" bosilganda ishlaydi)
  const confirmDelete = async () => {
    setDeleting(true)
    try {
      await api.delete(`/image/${id}`)
      navigate(-1)
    } catch (err) {
      alert("O'chirishda xato yuz berdi: " + err.message)
    } finally {
      setDeleting(false)
      setShowDeleteModal(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pin?.title || 'Pin',
          text: pin?.description || '',
          url: window.location.href,
        })
      } catch (err) {
        // Bekor qilindi
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

  const isOwner = currentUser?.id && pin.user?.id &&
    String(currentUser.id) === String(pin.user.id)

  return (
    <div>
      <Navbar search="" onSearch={() => {}} onSubmit={() => {}} />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FiArrowLeft /> Orqaga
        </button>

        <div className="flex gap-8 bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Chap tomon — rasm */}
          <div className="w-1/2 flex-shrink-0 bg-gray-100">
            <img
              src={imageUrl}
              alt={pin.title || "Pin image"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* O'ng tomon — ma'lumotlar */}
          <div className="flex-1 p-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2 items-center">

                {/* 3 nuqta — Dropdown menyu */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <FiMoreHorizontal className="text-gray-700" />
                  </button>

                  {menuOpen && (
                    <div className="absolute left-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 min-w-[160px]">
                      {isOwner ? (
                        <button 
                          onClick={() => {
                            setShowDeleteModal(true) // Native confirm o'rniga modalni ochish
                            setMenuOpen(false) // Dropdownni yopish
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2 font-medium"
                        >
                          <FiTrash2 />
                          O'chirish
                        </button>
                      ) : (
                        <div className="px-4 py-2.5 text-gray-400 text-sm">
                          Amallar yo'q
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Share tugmasi */}
                <button 
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <FiShare2 className="text-gray-700" />
                </button>

                {/* Download tugmasi */}
                <a
                  href={`http://localhost:5000/api/image/${pin.id}/download`}
                  download={pin.filename || 'pin-image'}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <FiDownload className="text-gray-700" />
                </a>
              </div>

              <button className="px-5 py-2.5 bg-[#E60023] text-white rounded-full font-medium hover:bg-[#c0001d] transition-colors">
                Saqlash
              </button>
            </div>

            {/* Sarlavha va Tavsif */}
            {pin.title && <h1 className="text-2xl font-bold text-gray-900 mb-3">{pin.title}</h1>}
            {pin.description && <p className="text-gray-600 text-sm leading-relaxed mb-4">{pin.description}</p>}

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

            {/* Muallif bloki */}
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#E60023] flex items-center justify-center text-white font-medium">
                {pin.user?.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{pin.user?.username || 'Foydalanuvchi'}</p>
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

      {/* ================= MODAL OYNA (Dizayn va Klik muammosi hal qilingan qism) ================= */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-all">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full mx-4 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Rasmni o'chirish</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Ushbu rasmni butunlay o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                Bekor qilish
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-2 bg-[#E60023] text-white rounded-full text-sm font-medium hover:bg-[#c0001d] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting ? "O'chirilmoqda..." : "O'chirish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}