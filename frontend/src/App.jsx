import React from 'react'
import { Route, Routes, Navigate } from "react-router"
import { useAuth } from "@clerk/react"
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import CallPage from './pages/CallPage'
const App = () => {
  const { isSignedIn } = useAuth()
  console.log(isSignedIn);

  return (
    <>
      <Routes>
        <Route path="/" element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />} />
        <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />} />

        <Route
          path="/call/:id"
          element={isSignedIn ? <CallPage /> : <Navigate to={"/auth"} replace />}
        />

        <Route
          path="*"
          element={isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} replace />}
        />
      </Routes>
    </>
  )
}

export default App