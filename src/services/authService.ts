// src/services/authService.ts
// Contiene la lógica para la autenticación (login/logout) y la gestión del usuario actual
// utilizando localStorage para simular el almacenamiento de credenciales.
import type { User, Role } from "../types/auth"

// Usuarios de prueba con roles definidos. En un entorno real, esto vendría de un backend.
const MOCK_USERS: Record<string, { password: string; role: Role }> = {
  "hr_manager@bpdata.com": { password: "password123", role: "HR Manager" },
  "hr_analyst@bpdata.com": { password: "password123", role: "HR Analyst" },
  "viewer@bpdata.com": { password: "password123", role: "Viewer" },
  "admin": { password: "admin", role: "Admin" }, // Admin user with simple credentials
}

const LOCAL_STORAGE_USER_KEY = "bpfeedbackdata_user"

export const authService = {
  /**
   * Intenta iniciar sesión con el nombre de usuario y la contraseña proporcionados.
   * @param username El nombre de usuario (email) del usuario.
   * @param password La contraseña del usuario.
   * @returns El objeto User si las credenciales son válidas, de lo contrario null.
   */
  login: (username: string, password: string): User | null => {
    console.log("[AuthService] Login attempt for:", username)
    console.log("[AuthService] Available users:", Object.keys(MOCK_USERS))
    
    const userCredentials = MOCK_USERS[username]
    if (userCredentials && userCredentials.password === password) {
      const user: User = { username, role: userCredentials.role }
      console.log("[AuthService] Login successful, storing user in localStorage:", user)
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
      return user
    }
    
    console.log("[AuthService] Login failed - invalid credentials")
    return null
  },

  /**
   * Cierra la sesión del usuario actual, eliminando sus datos de localStorage.
   */
  logout: (): void => {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
  },

  /**
   * Obtiene el usuario actualmente autenticado desde localStorage.
   * @returns El objeto User si hay un usuario autenticado, de lo contrario null.
   */
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") {
      console.log("[AuthService] SSR detected, returning null")
      return null // Para SSR
    }

    console.log("[AuthService] Getting current user from localStorage...")
    const userJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    console.log("[AuthService] Raw localStorage data:", userJson)
    
    try {
      const user = userJson ? JSON.parse(userJson) : null
      console.log("[AuthService] Parsed user:", user)
      return user
    } catch (e) {
      console.error("[AuthService] Error parsing user from localStorage", e)
      return null
    }
  },
}
