// src/types/auth.ts
// Define los tipos para los roles de usuario y la interfaz de usuario.
export type Role = "HR Manager" | "HR Analyst" | "Viewer" | "Admin" // Added Admin role

export interface User {
  username: string
  role: Role
}
