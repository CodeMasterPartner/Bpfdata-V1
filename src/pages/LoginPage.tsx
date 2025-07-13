"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">Accede a tu panel de BPFeedbackData</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Usuario</Label>
              <Input
                id="username"
                type="email"
                placeholder="tu@empresa.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full">
              Acceder
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center text-muted-foreground">
          <div className="space-y-2">
            <p>¿Problemas para acceder? Contacta a soporte de BPFeedbackData.</p>
            <div className="text-xs space-y-1">
              <p>
                <strong>Usuarios de prueba:</strong>
              </p>
              <p>hr_manager@bpdata.com / password123</p>
              <p>hr_analyst@bpdata.com / password123</p>
              <p>viewer@bpdata.com / password123</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
