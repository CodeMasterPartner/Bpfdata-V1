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
import { Home, HelpCircle, FileText, LinkIcon, LogIn, Users, BarChart3, GitCompare } from "lucide-react"

interface NavItem {
  title: string
  route: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Inicio",
    route: "/platform",
    icon: Home,
  },
  {
    title: "Participación",
    route: "/platform/participation",
    icon: Users,
  },
  {
    title: "Dashboard",
    route: "/platform/analytics",
    icon: BarChart3,
  },
  {
    title: "Comparativas",
    route: "/platform/comparisons",
    icon: GitCompare,
  },
  {
    title: "Preguntas",
    route: "/platform/questions",
    icon: HelpCircle,
  },
  {
    title: "Informes",
    route: "/platform/reports",
    icon: FileText,
  },
  {
    title: "Buenas prácticas",
    route: "/platform/best-practices",
    icon: LinkIcon,
  },
]

export function PublicNav() {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (route: string) => {
    router.push(route)
  }

  const handleLogin = () => {
    router.push("/login")
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Explorar Plataforma</SidebarGroupLabel>
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
              <div className="font-medium">Acceso público</div>
              <div className="text-xs opacity-70">Funcionalidad limitada</div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogin} className="text-brand-primary hover:text-brand-primary-dark hover:bg-blue-50">
              <LogIn />
              <span>Iniciar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}