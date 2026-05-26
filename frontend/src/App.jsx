import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import ProfilePage from './pages/ProfilePage'
import PinDetailPage from './pages/PinDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/pin/:id" element={<PinDetailPage />} />
    </Routes>
  )
}

export default App