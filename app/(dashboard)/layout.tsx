"use client"

import { DashboardLayout } from "../../src/components/DashboardLayout"
import { AuthGuard } from "../../src/components/AuthGuard"

export default function DashboardLayoutRoute({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthGuard>
  )
}