import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default App