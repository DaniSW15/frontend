import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { LoginView, RegisterView, ForgotPasswordView } from "@/features/auth"
import Dashboard from './views/Dashboard'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <>
      <Toaster richColors position="top-right" /> {/* Renderiza esto aquí */}
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            {/* Rutas Públicas (Protegidas para no re-entrar si ya hay sesión) */}
            <Route path="/login" element={<PublicRoute><LoginView /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegisterView /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPasswordView /></PublicRoute>} />

            {/* Rutas Protegidas (Requieren sesión activa) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
