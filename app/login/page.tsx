"use client"

import { AuthProvider } from "../../src/contexts/AuthContext"
import LoginPage from "../../src/components/pages/LoginPage"

export default function LoginPageRoute() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  )
}