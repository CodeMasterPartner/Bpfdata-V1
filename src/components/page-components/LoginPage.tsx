"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!login(username, password)) {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-secondary to-brand-primary flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-10">
          {/* Title */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-primary mb-2 sm:mb-4">
              BPFeedback
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700">
              Iniciar Sesión
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <Input
                id="username"
                type="text"
                placeholder="Usuario o Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-10 sm:h-12 lg:h-14 px-3 sm:px-4 border border-gray-300 rounded-md focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm sm:text-base"
              />
            </div>
            
            <div>
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-10 sm:h-12 lg:h-14 px-3 sm:px-4 border border-gray-300 rounded-md focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm sm:text-base"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-10 sm:h-12 lg:h-14 bg-brand-primary hover:bg-brand-primary-dark text-white font-medium rounded-md transition-colors text-sm sm:text-base lg:text-lg"
            >
              Acceder
            </Button>

            {/* Links */}
            <div className="text-center space-y-2 sm:space-y-3">
              <div>
                <button
                  type="button"
                  className="text-sm sm:text-base text-gray-600 hover:text-brand-primary transition-colors"
                >
                  ¿Has olvidado tu contraseña?
                </button>
              </div>
              
              <div>
                <button
                  type="button"
                  className="text-sm sm:text-base text-brand-primary hover:text-brand-primary-dark font-medium transition-colors"
                >
                  Visitar BPFeedback
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
