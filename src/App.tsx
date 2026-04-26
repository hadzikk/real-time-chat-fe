import { Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import useAuthStore from "./store/useAuthStore"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
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
          <Route path="/chat" element={authUser !== null ? <HomePage /> : <Navigate to="/signin" />} />
          <Route path="/signup" element={authUser !== null ? <Navigate to="/chat" /> : <SignUpPage />} />
          <Route path="/signin" element={authUser !== null ? <Navigate to="/chat" /> : <SignInPage />} />
        </Routes>

        <Toaster 
          position="bottom-left"
        />
      </div>
  )
}

export default App