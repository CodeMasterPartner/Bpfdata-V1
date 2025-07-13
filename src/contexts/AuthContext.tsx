"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import type { User, Role } from "../types/auth"
import { authService } from "../services/authService"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  hasPermission: (requiredRoles: Role[]) => boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Al cargar la aplicación, intenta recuperar el usuario de localStorage.
  useEffect(() => {
    console.log("[AuthContext] Initializing authentication...")
    
    if (typeof window === "undefined") {
      console.log("[AuthContext] Server-side rendering, skipping auth initialization")
      setIsLoading(false)
      return
    }

    console.log("[AuthContext] Checking for existing user session...")
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      console.log("[AuthContext] Found existing user:", { username: currentUser.username, role: currentUser.role })
      setUser(currentUser)
      setIsAuthenticated(true)
    } else {
      console.log("[AuthContext] No existing user session found")
    }
    setIsLoading(false)
    console.log("[AuthContext] Authentication initialization complete")
  }, [])

  // Función para iniciar sesión.
  const login = (username: string, password: string): boolean => {
    console.log("[AuthContext] Attempting login for user:", username)
    const loggedInUser = authService.login(username, password)
    if (loggedInUser) {
      console.log("[AuthContext] Login successful:", { username: loggedInUser.username, role: loggedInUser.role })
      setUser(loggedInUser)
      setIsAuthenticated(true)
      return true
    } else {
      console.log("[AuthContext] Login failed for user:", username)
    }
    return false
  }

  // Función para cerrar sesión.
  const logout = () => {
    console.log("[AuthContext] Logging out user:", user?.username)
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
    console.log("[AuthContext] Logout complete")
  }

  // Verifica si el usuario actual tiene alguno de los roles requeridos.
  const hasPermission = (requiredRoles: Role[]): boolean => {
    if (!user) return false
    return requiredRoles.includes(user.role)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para consumir el contexto de autenticación.
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
