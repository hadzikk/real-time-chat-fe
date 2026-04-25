import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import useAuthStore from "./store/useAuthStore"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { Toaster } from "react-hot-toast"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && authUser == null) {
    return <div>
      <p>Loading...</p>
    </div>
  }

  console.log(authUser)

  return (
      <div>
        <Routes>
          <Route path="/chat" element={authUser ? <HomePage /> : <Navigate to="/signin" />} />
          <Route path="/signup" element={authUser ? <Navigate to="/chat" /> : <SignUpPage />} />
          <Route path="/signin" element={authUser ? <Navigate to="/chat" /> : <SignInPage />} />
          <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/" /> } />
        </Routes>

        <Toaster 
          position="bottom-left"
        />
      </div>
  )
}

export default App