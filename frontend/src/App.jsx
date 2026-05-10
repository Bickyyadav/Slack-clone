
import { Route, Routes, Navigate } from "react-router"
import { useAuth } from "@clerk/react"
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import CallPage from './pages/CallPage'

import * as Sentry from "@sentry/react";
const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);
const App = () => {
  const { isSignedIn } = useAuth()


  return (
    <SentryRoutes>
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
    </SentryRoutes>
  )
}

export default App