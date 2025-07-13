"use client"

import type React from "react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Home, HelpCircle, FileText, LinkIcon, LogOut, Users, BarChart3, GitCompare } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

interface NavItem {
  title: string
  key: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Inicio",
    key: "dashboard",
    icon: Home,
  },
  {
    title: "Participación",
    key: "participation",
    icon: Users,
  },
  {
    title: "Dashboard",
    key: "analytics",
    icon: BarChart3,
  },
  {
    title: "Comparativas",
    key: "comparisons",
    icon: GitCompare,
  },
  {
    title: "Preguntas",
    key: "questions",
    icon: HelpCircle,
  },
  {
    title: "Informes",
    key: "reports",
    icon: FileText,
  },
  {
    title: "Buenas prácticas",
    key: "best-practices",
    icon: LinkIcon,
  },
]

interface MainNavProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

export function MainNav({ currentPage, setCurrentPage }: MainNavProps) {
  const { logout, user } = useAuth()

  const handleLogout = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      logout()
    }
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Navegación Principal</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.key}>
                <SidebarMenuButton onClick={() => setCurrentPage(item.key)} isActive={currentPage === item.key}>
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-2 py-1 text-xs text-muted-foreground">
              <div className="font-medium">{user?.username?.split("@")[0]}</div>
              <div className="text-xs opacity-70">{user?.role}</div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
