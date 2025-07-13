// src/services/authService.ts
// Contiene la lógica para la autenticación (login/logout) y la gestión del usuario actual
// utilizando localStorage para simular el almacenamiento de credenciales.
import type { User, Role } from "../types/auth"

// Usuarios de prueba con roles definidos. En un entorno real, esto vendría de un backend.
const MOCK_USERS: Record<string, { password: string; role: Role }> = {
  "hr_manager@bpdata.com": { password: "password123", role: "HR Manager" },
  "hr_analyst@bpdata.com": { password: "password123", role: "HR Analyst" },
  "viewer@bpdata.com": { password: "password123", role: "Viewer" },
  "admin@bpdata.com": { password: "adminpassword", role: "Admin" }, // New Admin user
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
    const userCredentials = MOCK_USERS[username]
    if (userCredentials && userCredentials.password === password) {
      const user: User = { username, role: userCredentials.role }
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
      return user
    }
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
    if (typeof window === "undefined") return null // Para SSR

    const userJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY)
    try {
      return userJson ? JSON.parse(userJson) : null
    } catch (e) {
      console.error("Error parsing user from localStorage", e)
      return null
    }
  },
}
