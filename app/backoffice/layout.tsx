"use client"

import { useState } from "react"

import type { ReactNode } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { PanelLeft, LayoutDashboard, Users, FileText, BarChart2, Settings, LogOut } from "lucide-react"
import { useAuth } from "../../src/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BackofficeNavProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

function BackofficeNav({ currentPage, setCurrentPage }: BackofficeNavProps) {
  const { logout } = useAuth()

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
    { name: "Clientes", icon: Users, key: "clients" },
    { name: "Informes", icon: FileText, key: "reports" },
    { name: "Métricas", icon: BarChart2, key: "metrics" },
    { name: "Usuarios", icon: Settings, key: "users" },
  ]

  const handleLogout = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión del Backoffice?")) {
      logout()
    }
  }

  return (
    <>
      <div className="p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.key}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left px-4 py-2 rounded-md",
              currentPage === item.key ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50",
            )}
            onClick={() => setCurrentPage(item.key)}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Button>
        ))}
      </div>
      <div className="mt-auto p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-left px-4 py-2 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Cerrar sesión
        </Button>
      </div>
    </>
  )
}

function BackofficeLayoutContent({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, isLoading, hasPermission } = useAuth()
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState("dashboard") // Default backoffice page

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !hasPermission(["Admin"]))) {
      router.push("/login") // Redirect to login if not authenticated or not admin
    }
  }, [isAuthenticated, isLoading, hasPermission, router])

  if (isLoading || !isAuthenticated || !hasPermission(["Admin"])) {
    return <div className="flex items-center justify-center min-h-screen">Cargando Backoffice...</div>
  }

  // This is a simplified way to render children based on currentPage for the backoffice.
  // In a full Next.js App Router setup, you'd use nested routes for each section.
  // For this demo, we'll simulate navigation within the layout.
  const renderBackofficePage = () => {
    switch (currentPage) {
      case "clients":
        return <div className="p-6">Gestión de Clientes (Próximamente)</div> // Placeholder
      case "reports":
        return <div className="p-6">Carga de Informes (Próximamente)</div> // Placeholder
      case "metrics":
        return <div className="p-6">Carga de Estadísticas/Métricas (Próximamente)</div> // Placeholder
      case "users":
        return <div className="p-6">Roles y Accesos (Próximamente)</div> // Placeholder
      case "dashboard":
      default:
        return <div className="p-6">Dashboard del Backoffice (Próximamente)</div> // Main Dashboard
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        {/* Sidebar fijo a la izquierda */}
        <Sidebar className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white border-r border-gray-800">
          <SidebarHeader className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <img src="/placeholder.svg?height=24&width=24" alt="BPFeedbackData Logo" className="h-6 w-6 invert" />
              <span className="text-lg font-semibold">BPFeedbackData Admin</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="flex flex-col h-[calc(100%-64px)]">
            <BackofficeNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </SidebarContent>
        </Sidebar>
        {/* Contenido principal con margen para el sidebar */}
        <SidebarInset className="flex flex-col flex-1 ml-64 bg-gray-50">
          <header className="flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6 shadow-sm">
            <SidebarTrigger className="h-7 w-7 md:hidden">
              <PanelLeft className="h-4 w-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </SidebarTrigger>
            <h1 className="text-xl font-semibold text-gray-800">Backoffice</h1>
            <div className="ml-auto flex items-center gap-2">
              {user && (
                <span className="text-sm text-muted-foreground">
                  Bienvenido, {user.username} ({user.role})
                </span>
              )}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6">{renderBackofficePage()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export default function BackofficeLayout({ children }: { children: ReactNode }) {
  return (
    <BackofficeLayoutContent>
      {children}
    </BackofficeLayoutContent>
  )
}
