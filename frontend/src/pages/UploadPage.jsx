import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUploadCloud, FiX, FiArrowLeft } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import api from '../service/api'

export default function UploadPage() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    if (!dropped) return
    setFile(dropped)
    setPreview(URL.createObjectURL(dropped))
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
  }

  const addTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim().replace(',', '')
      if (!tags.includes(newTag) && tags.length < 10) {
        setTags([...tags, newTag])
      }
      setTagInput('')
    }
  }

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleUpload = async () => {
    if (!file) return setError('Rasm tanlang!')
    if (!formData.title) return setError('Sarlavha kiriting!')

    setLoading(true)
    setError('')

    try {
      const data = new FormData()
      data.append('image', file)
      data.append('title', formData.title)
      data.append('description', formData.description)
      data.append('tags', tags.join(','))

      await api.post('/image/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Xato yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft /> Orqaga
          </button>
          <h1 className="text-lg font-semibold">Pin yaratish</h1>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-5 py-2 bg-[#E60023] text-white rounded-full text-sm font-medium hover:bg-[#c0001d] disabled:opacity-60 transition-colors"
          >
            {loading ? 'Yuklanmoqda...' : 'Nashr etish'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        <div className="flex gap-6">
          {/* Rasm yuklash */}
          <div className="w-80 flex-shrink-0">
            {!preview ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center gap-3 p-8 cursor-pointer hover:border-[#E60023] hover:bg-red-50 transition-all min-h-96"
                onClick={() => document.getElementById('fileInput').click()}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
              >
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <FiUploadCloud className="text-5xl text-gray-300" />
                <p className="text-sm font-medium text-gray-600 text-center">
                  Rasmni bu yerga tashlang
                </p>
                <p className="text-xs text-gray-400 text-center">
                  JPG, PNG, WEBP — max 5MB
                </p>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50">
                  Faylni tanlash
                </button>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full object-cover rounded-2xl"
                />
                <button
                  onClick={removeFile}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-100"
                >
                  <FiX />
                </button>
              </div>
            )}
          </div>

          {/* Forma */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Sarlavha <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Sarlavha qo'shing"
                maxLength={100}
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E60023]"
              />
              <p className="text-xs text-gray-400 text-right mt-1">{formData.title.length}/100</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Tavsif</label>
              <textarea
                placeholder="Nima haqida ekanligini yozing..."
                maxLength={500}
                rows={4}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E60023] resize-none"
              />
              <p className="text-xs text-gray-400 text-right mt-1">{formData.description.length}/500</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Teglar</label>
              <div
                className="flex flex-wrap gap-2 p-3 border border-gray-300 rounded-xl min-h-12 cursor-text"
                onClick={() => document.getElementById('tagInput').focus()}
              >
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="text-gray-400 hover:text-gray-600">
                      <FiX size={12} />
                    </button>
                  </span>
                ))}
                <input
                  id="tagInput"
                  type="text"
                  placeholder={tags.length === 0 ? "Teg qo'shing (Enter)..." : ''}
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={addTag}
                  className="outline-none text-sm bg-transparent flex-1 min-w-20"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Havola (ixtiyoriy)</label>
              <input
                type="url"
                placeholder="https://..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#E60023]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}