"use client"

import type { ReactNode } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { MainNav } from "./MainNav"
import { useAuth } from "../contexts/AuthContext"
import { PanelLeft } from "lucide-react" // Import PanelLeft icon

interface DashboardLayoutProps {
  children: ReactNode
  currentPage: string
  setCurrentPage: (page: string) => void
}

export function DashboardLayout({ children, currentPage, setCurrentPage }: DashboardLayoutProps) {
  const { user } = useAuth()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar fijo a la izquierda */}
        <Sidebar className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r hidden md:block">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-2">
              <img src="/placeholder.svg?height=24&width=24" alt="BPFeedbackData Logo" className="h-6 w-6" />
              <span className="text-lg font-semibold">BPFeedbackData</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <MainNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </SidebarContent>
        </Sidebar>
        {/* Contenido principal con margen para el sidebar */}
        <SidebarInset className="flex flex-col flex-1 md:ml-72">
          <header className="flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            {/* Botón para mostrar/ocultar sidebar en móvil */}
            <SidebarTrigger className="h-7 w-7 md:hidden">
              <PanelLeft className="h-4 w-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </SidebarTrigger>
            <h1 className="text-xl font-semibold">Panel de Gestión</h1>
            <div className="ml-auto flex items-center gap-2">
              {user && (
                <span className="text-sm text-muted-foreground">
                  Bienvenido, {user.username} ({user.role})
                </span>
              )}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
