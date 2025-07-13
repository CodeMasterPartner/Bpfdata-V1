"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, FileText, FileSpreadsheet, Sparkles } from "lucide-react"
import { dataService, type ReportData } from "../services/dataService"
import { useAuth } from "../contexts/AuthContext"
import { cn } from "@/lib/utils" // Import cn utility

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const { user, hasPermission } = useAuth()

  // Define main categories and their sub-categories
  const categories = [
    { name: "Todos", color: "bg-[#20B2AA] hover:bg-[#1A938C]" }, // Teal
    { name: "Análisis", color: "bg-[#4CAF50] hover:bg-[#45A049]" }, // Green
    { name: "Documentos", color: "bg-[#4CAF50] hover:bg-[#45A049]" },
    { name: "Informes", color: "bg-[#4CAF50] hover:bg-[#45A049]" },
    { name: "Nóminas", color: "bg-[#4CAF50] hover:bg-[#45A049]" },
    { name: "RRHH", color: "bg-[#4CAF50] hover:bg-[#45A049]" },
  ]

  const subCategories: { [key: string]: { name: string; color: string }[] } = {
    Análisis: [
      { name: "Alertas automáticas", color: "bg-[#8BC34A] hover:bg-[#7CB342]" }, // Light Green
      { name: "Análisis de KPI", color: "bg-[#4CAF50] hover:bg-[#45A049]" }, // Dark Green
    ],
    Informes: [
      { name: "Comparativa anual", color: "bg-[#4CAF50] hover:bg-[#45A049]" },
      { name: "Evolución temporal", color: "bg-[#4CAF50] hover:bg-[#45A049]" },
    ],
  }

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await dataService.getReportsData()
        setReports(data)
      } catch (error) {
        console.error("Error loading reports data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadReports()
  }, [])

  const filteredReports = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    return reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        report.uploadDate.toLowerCase().includes(lowerCaseSearchTerm) ||
        (report.subCategory && report.subCategory.toLowerCase().includes(lowerCaseSearchTerm))

      const matchesCategory = selectedCategory === "Todos" || report.category === selectedCategory

      const matchesSubCategory = !selectedSubCategory || report.subCategory === selectedSubCategory

      return matchesSearch && matchesCategory && matchesSubCategory
    })
  }, [reports, searchTerm, selectedCategory, selectedSubCategory])

  const handleDownload = (report: ReportData) => {
    if (user && (user.role === "HR Manager" || user.role === "HR Analyst")) {
      alert(`Descargando: ${report.title} (${report.type})`)
    } else {
      alert("No tienes permiso para descargar este informe.")
    }
  }

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName)
    setSelectedSubCategory(null) // Reset sub-category when main category changes
  }

  const handleSubCategoryClick = (subCategoryName: string) => {
    setSelectedSubCategory(subCategoryName)
  }

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Informes</h2>
        <p>Cargando informes...</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Informes</h1>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar archivos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Horizontal Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <Button
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={cn(
              "text-white px-4 py-2 rounded-md text-sm font-medium",
              category.color,
              selectedCategory === category.name ? "opacity-100" : "opacity-80",
            )}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
        {/* Vertical Sub-Category Filters */}
        <Card className="shadow-sm p-4">
          <CardContent className="p-0 space-y-2">
            {selectedCategory !== "Todos" && subCategories[selectedCategory] && (
              <>
                {subCategories[selectedCategory].map((subCategory) => (
                  <Button
                    key={subCategory.name}
                    onClick={() => handleSubCategoryClick(subCategory.name)}
                    className={cn(
                      "w-full justify-start text-white px-4 py-2 rounded-md text-sm font-medium",
                      subCategory.color,
                      selectedSubCategory === subCategory.name ? "opacity-100" : "opacity-80",
                    )}
                  >
                    {subCategory.name}
                  </Button>
                ))}
              </>
            )}
            {selectedCategory === "Todos" && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Selecciona una categoría principal para ver subcategorías.
              </p>
            )}
            {selectedCategory !== "Todos" && !subCategories[selectedCategory] && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay subcategorías para esta categoría.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Resultados de la búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredReports.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No se encontraron informes que coincidan con los filtros.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Fecha de Subida</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {report.isNew && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                <Sparkles className="h-3 w-3 mr-1" /> Nuevo
                              </Badge>
                            )}
                            {report.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          {report.type === "PDF" ? (
                            <FileText className="h-5 w-5 text-red-500" />
                          ) : (
                            <FileSpreadsheet className="h-5 w-5 text-green-600" />
                          )}
                        </TableCell>
                        <TableCell>{new Date(report.uploadDate).toLocaleDateString("es-ES")}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(report)}
                            disabled={!hasPermission(["HR Manager", "HR Analyst"])}
                            className="flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" />
                            Descargar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Información de permisos */}
      <Card className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-600">
        <p>
          <strong>Nota sobre permisos:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>• Los usuarios con rol "HR Manager" y "HR Analyst" pueden ver y descargar todos los informes.</li>
          <li>• Los usuarios con rol "Viewer" solo pueden ver los informes, pero no tienen acceso a la descarga.</li>
        </ul>
      </Card>
    </div>
  )
}
