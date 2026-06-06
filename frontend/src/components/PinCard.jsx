import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PinCard({ pin }) {
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const navigate = useNavigate()

  const imageUrl = `http://localhost:5000/${pin.filepath.replace(/\\/g, '/')}`

  // Rasm yo'q bo'lsa butun kartani yashir
  if (imgError) return null

  return (
    <div
      className="break-inside-avoid mb-3 rounded-2xl overflow-hidden cursor-pointer relative group"
      onClick={() => navigate(`/pin/${pin.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt={pin.title}
          onError={() => setImgError(true)} // ← faqat bitta onError
          className="w-full block rounded-2xl"
        />

        {hovered && (
          <div className="absolute inset-0 bg-black/25 rounded-2xl flex flex-col justify-between p-3">
            <button className="self-end bg-[#E60023] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#c0001d] transition-colors">
              Saqlash
            </button>
            <div className="flex gap-2 self-end">
              <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-gray-700 text-sm hover:bg-white">
                ···
              </button>
            </div>
          </div>
        )}
      </div>

      {pin.title && (
        <div className="px-2 py-2">
          <p className="text-sm font-medium text-gray-800 line-clamp-2">{pin.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-5 h-5 rounded-full bg-[#E60023]"></div>
            <span className="text-xs text-gray-500">
              {pin.user?.username || 'Foydalanuvchi'}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}