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
import { PublicNav } from "../../src/components/PublicNav"
import { PanelLeft } from "lucide-react"

interface PublicLayoutProps {
  children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
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
            <div className="mt-2 px-1">
              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                Vista Pública
              </span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <PublicNav />
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
            <h1 className="text-xl font-semibold">BPFeedbackData - Plataforma</h1>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Acceso público • <a href="/login" className="text-brand-primary hover:text-brand-primary-dark cursor-pointer font-medium">Iniciar sesión</a> para funcionalidad completa
              </span>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}