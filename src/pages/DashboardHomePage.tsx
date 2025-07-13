"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { dataService, type KPIData } from "../services/dataService"
import {
  TrendingUp,
  Users,
  Heart,
  BarChart3,
  GitCompare,
  HelpCircle,
  FileText,
  ExternalLink,
  ArrowRight,
  Activity,
} from "lucide-react"

interface QuickAccessCard {
  title: string
  description: string
  icon: React.ElementType
  key: string
  badge?: string
}

const quickAccessItems: QuickAccessCard[] = [
  {
    title: "Participación",
    description: "Consulta el nivel de respuesta de las encuestas por departamento.",
    icon: Users,
    key: "participation",
    badge: "Nuevo",
  },
  {
    title: "Dashboard",
    description: "Visualiza KPIs clave como eNPS, satisfacción global y engagement.",
    icon: BarChart3,
    key: "analytics",
  },
  {
    title: "Comparativas",
    description: "Compara resultados entre diferentes periodos o áreas.",
    icon: GitCompare,
    key: "comparisons",
  },
  {
    title: "Preguntas",
    description: "Revisa respuestas detalladas a cada ítem de la encuesta.",
    icon: HelpCircle,
    key: "questions",
  },
  {
    title: "Informes",
    description: "Accede y descarga informes en formato PDF o Excel.",
    icon: FileText,
    key: "reports",
    badge: "3 nuevos",
  },
  {
    title: "Buenas prácticas",
    description: "Explora enlaces útiles y recomendaciones externas.",
    icon: ExternalLink,
    key: "best-practices",
  },
]

interface DashboardHomePageProps {
  setCurrentPage: (page: string) => void
}

export default function DashboardHomePage({ setCurrentPage }: DashboardHomePageProps) {
  const { user } = useAuth()
  const [kpiData, setKpiData] = useState<KPIData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await dataService.getKPIData()
        setKpiData(data)
      } catch (error) {
        console.error("Error loading KPI data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "HR Manager":
        return "Gerente de RRHH"
      case "HR Analyst":
        return "Analista de RRHH"
      case "Viewer":
        return "Visualizador"
      default:
        return role
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Buenos días"
    if (hour < 18) return "Buenas tardes"
    return "Buenas noches"
  }

  return (
    <div className="space-y-6 w-full max-w-none overflow-x-hidden">
      {/* Mensaje de bienvenida */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="bg-blue-500 p-3 rounded-full">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {getGreeting()}, {user?.username?.split("@")[0] || "usuario"}!
            </h1>
            <p className="text-gray-600 mt-1">
              Has accedido correctamente al panel de gestión de <strong>BPFeedbackData</strong>
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {getRoleDisplayName(user?.role || "")}
              </Badge>
              <span className="text-sm text-gray-500">Última conexión: {new Date().toLocaleDateString("es-ES")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs principales */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Resumen de KPIs
        </h2>

        {loading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">eNPS</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{kpiData?.enps}</div>
                <p className="text-xs text-muted-foreground">Employee Net Promoter Score</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Satisfacción Global</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{kpiData?.satisfaction}/10</div>
                <p className="text-xs text-muted-foreground">Promedio general</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{kpiData?.engagement}/10</div>
                <p className="text-xs text-muted-foreground">Nivel de compromiso</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Evolución</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+{kpiData?.evolution}%</div>
                <p className="text-xs text-muted-foreground">vs. periodo anterior</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Menú principal de acceso rápido */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Acceso rápido a secciones
        </h2>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {quickAccessItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Card key={item.key} className="hover:shadow-lg transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                        {item.badge && (
                          <Badge variant="secondary" className="text-xs mt-1">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  <Button
                    onClick={() => setCurrentPage(item.key)}
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Acceder
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Información adicional */}
      <div className="bg-gray-50 border rounded-lg p-4 md:p-6">
        <h3 className="font-semibold mb-2">💡 Consejos para empezar</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            • Comienza revisando la sección <strong>Participación</strong> para conocer el nivel de respuesta
          </li>
          <li>
            • Utiliza <strong>Dashboard</strong> para obtener una visión general de los KPIs principales
          </li>
          <li>
            • Explora <strong>Comparativas</strong> para identificar tendencias entre periodos
          </li>
          <li>
            • Descarga informes desde la sección <strong>Informes</strong> para análisis detallados
          </li>
        </ul>
      </div>
    </div>
  )
}
