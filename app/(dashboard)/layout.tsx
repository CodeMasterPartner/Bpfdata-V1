"use client"

import { DashboardLayout } from "../../src/components/DashboardLayout"

export default function DashboardLayoutRoute({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}