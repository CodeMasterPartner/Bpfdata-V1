"use client"

import type React from "react"
import { useRouter, usePathname } from "next/navigation"
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
  route: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Inicio",
    route: "/",
    icon: Home,
  },
  {
    title: "Participación",
    route: "/participation",
    icon: Users,
  },
  {
    title: "Dashboard",
    route: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Comparativas",
    route: "/comparisons",
    icon: GitCompare,
  },
  {
    title: "Preguntas",
    route: "/questions",
    icon: HelpCircle,
  },
  {
    title: "Informes",
    route: "/reports",
    icon: FileText,
  },
  {
    title: "Buenas prácticas",
    route: "/best-practices",
    icon: LinkIcon,
  },
]

export function MainNav() {
  const { logout, user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      logout()
      router.push("/login")
    }
  }

  const handleNavigation = (route: string) => {
    router.push(route)
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Navegación Principal</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.route}>
                <SidebarMenuButton onClick={() => handleNavigation(item.route)} isActive={pathname === item.route}>
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
