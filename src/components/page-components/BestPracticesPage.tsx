"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { dataService, type BestPractice } from "../../services/dataService"

interface BestPracticesPageProps {
  isPublic?: boolean
}

export function BestPracticesPage({ isPublic = false }: BestPracticesPageProps) {
  const [bestPractices, setBestPractices] = useState<BestPractice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBestPractices = async () => {
      try {
        const data = await dataService.getBestPracticesData()
        setBestPractices(data)
      } catch (error) {
        console.error("Error loading best practices data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadBestPractices()
  }, [])

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Buenas prácticas</h2>
        <p>Cargando recursos de buenas prácticas...</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Buenas Prácticas</h1>

      <p className="text-lg text-gray-600">
        Explora recursos externos recomendados para mejorar el clima laboral, engagement, liderazgo y más.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestPractices.map((practice) => (
          <Card key={practice.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">{practice.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">{practice.description}</p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <a
                  href={practice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Ver Recurso
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {bestPractices.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No hay recursos de buenas prácticas disponibles.</p>
      )}
    </div>
  )
}

export default BestPracticesPage
