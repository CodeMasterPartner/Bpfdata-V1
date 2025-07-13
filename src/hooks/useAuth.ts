"use client"

// src/hooks/useAuth.ts
// Re-exporta el hook useAuth desde el contexto para una importación más limpia.
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
