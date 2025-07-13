"use client"

import { AuthProvider } from "../../src/contexts/AuthContext"
import LoginPage from "../../src/components/page-components/LoginPage"

export default function LoginPageRoute() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  )
}