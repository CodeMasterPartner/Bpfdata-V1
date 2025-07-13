"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import type { User, Role } from "../types/auth"
import { authService } from "../services/authService"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
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
    const currentUser = authService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  // Función para iniciar sesión.
  const login = (username: string, password: string): boolean => {
    const loggedInUser = authService.login(username, password)
    if (loggedInUser) {
      setUser(loggedInUser)
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  // Función para cerrar sesión.
  const logout = () => {
    authService.logout()
    setUser(null)
    setIsAuthenticated(false)
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
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, hasPermission }}>
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
