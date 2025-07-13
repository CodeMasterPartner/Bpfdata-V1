"use client"

import { AuthProvider } from "../../src/contexts/AuthContext"
import { DashboardLayout } from "../../src/components/DashboardLayout"
import { AuthGuard } from "../../src/components/AuthGuard"

export default function DashboardLayoutRoute({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </AuthGuard>
    </AuthProvider>
  )
}