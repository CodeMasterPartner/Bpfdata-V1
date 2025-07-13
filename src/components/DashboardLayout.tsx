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
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isAuthenticated } = useAuth()

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar fijo a la izquierda */}
        <Sidebar className="fixed inset-y-0 left-0 z-50 w-64 lg:w-72 bg-background border-r hidden md:block">
          <SidebarHeader className="p-4 border-b">
            <div className="flex items-center gap-2">
              <img src="/placeholder.svg?height=24&width=24" alt="BPFeedbackData Logo" className="h-6 w-6" />
              <span className="text-lg font-semibold">BPFeedbackData</span>
            </div>
            {!isAuthenticated && (
              <div className="mt-2 px-1">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  Acceso Público
                </span>
              </div>
            )}
          </SidebarHeader>
          <SidebarContent>
            <MainNav />
          </SidebarContent>
        </Sidebar>
        {/* Contenido principal con margen para el sidebar */}
        <SidebarInset className="flex flex-col flex-1 md:ml-64 lg:ml-72">
          <header className="flex h-14 sm:h-16 items-center gap-2 sm:gap-4 border-b bg-background px-3 sm:px-4 md:px-6">
            {/* Botón para mostrar/ocultar sidebar en móvil */}
            <SidebarTrigger className="h-7 w-7 md:hidden">
              <PanelLeft className="h-4 w-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </SidebarTrigger>
            <h1 className="text-lg sm:text-xl font-semibold truncate">{isAuthenticated ? "Panel de Gestión" : "BPFeedbackData - Explorar"}</h1>
            <div className="ml-auto hidden sm:flex items-center gap-2">
              {isAuthenticated && user ? (
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Bienvenido, {user.username} ({user.role})
                </span>
              ) : (
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Acceso público • <a href="/login" className="text-brand-primary hover:text-brand-primary-dark cursor-pointer font-medium">Iniciar sesión</a> para funcionalidad completa
                </span>
              )}
            </div>
          </header>
          <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
