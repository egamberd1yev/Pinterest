import { Routes, Route, Navigate } from 'react-router-dom'
import { createContext, useContext, useState } from 'react'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import ProfilePage from './pages/ProfilePage'
import PinDetailPage from './pages/PinDetailPage'

// ── Auth Context ──────────────────────────────────────
const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => localStorage.getItem('accessToken'))

  const login = (token) => {
    localStorage.setItem('accessToken', token)
    setUser(token)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Protected Route ───────────────────────────────────
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}


// ── App ───────────────────────────────────────────────
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Ochiq sahifalar */}
        <Route path="/login" element={<LoginPage />} />

        {/* Himoyalangan sahifalar */}
        <Route path="/" element={
          <ProtectedRoute><HomePage /></ProtectedRoute>
        } />
        <Route path="/upload" element={
          <ProtectedRoute><UploadPage /></ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute><ProfilePage /></ProtectedRoute>
        } />
        <Route path="/pin/:id" element={
          <ProtectedRoute><PinDetailPage /></ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  )
}

export default App