"use client"

import { AuthProvider } from "./contexts/AuthContext"
import AppRoutes from "./routes/AppRoutes"

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  )
}

export default App
