// // import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { FiSearch, FiBell, FiPlus } from 'react-icons/fi'

// export default function Navbar({search, onSearch, onSubmit}) {
//   const navigate = useNavigate()
//   // const [search, setSearch] = useState('')3

//   return (
//     <nav className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
//       <span
//         className="text-3xl text-[#E60023] cursor-pointer"
//         onClick={() => navigate('/')}
//       >
//         📌
//       </span>

//       <button
//         className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium"
//         onClick={() => navigate('/')}
//       >
//         Bosh sahifa
//       </button>

//       <button
//         className="px-4 py-2 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
//         onClick={() => navigate('/upload')}
//       >
//         Yaratish
//       </button>

//       <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
//         <FiSearch className="text-gray-400 text-lg" />
//         <input
//           type="text"
//           placeholder="Qidirish..."
//           value={search}
//           onKeyDown={e => e.key === 'Enter' && onSubmit()}
//           onChange={e => onSearch(e.target.value)}
//           className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
//         />
//       </div>

//       <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
//         <FiBell className="text-gray-700 text-lg" />
//       </button>

//       <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
//   <FiSearch onClick={onSubmit} className="text-gray-400 text-lg cursor-pointer" />
//   <input ... />
// </div>
//     </nav>
//   )
// }

import { useNavigate } from 'react-router-dom'
import { FiSearch, FiBell } from 'react-icons/fi'

export default function Navbar({ search, onSearch, onSubmit }) {
  const navigate = useNavigate()

  return (
    <nav className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
      <span
        className="text-3xl text-[#E60023] cursor-pointer"
        onClick={() => navigate('/')}
      >
        📌
      </span>

      <button
        className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium"
        onClick={() => navigate('/')}
      >
        Bosh sahifa
      </button>

      <button
        className="px-4 py-2 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
        onClick={() => navigate('/upload')}
      >
        Yaratish
      </button>

      <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
        <FiSearch
          onClick={onSubmit}
          className="text-gray-400 text-lg cursor-pointer"
        />
        <input
          type="text"
          placeholder="Qidirish..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSubmit()}
          className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
        />
      </div>

      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
        <FiBell className="text-gray-700 text-lg" />
      </button>

      <div
        className="w-9 h-9 rounded-full bg-[#E60023] flex items-center justify-center cursor-pointer text-white font-medium text-sm"
        onClick={() => navigate('/profile')}
      >
        U
      </div>
    </nav>
  )
}