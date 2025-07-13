"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  dataService,
  type OverallParticipationData,
  type DepartmentParticipationChartData,
} from "../../services/dataService"
import { MessageSquare, Percent, CalendarDays } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

export default function ParticipationPage() {
  const [overallParticipationChartData, setOverallParticipationChartData] = useState<OverallParticipationData[]>([])
  const [departmentParticipationChartData, setDepartmentParticipationChartData] = useState<
    DepartmentParticipationChartData[]
  >([])
  const [overallParticipationRate, setOverallParticipationRate] = useState<number | null>(null)
  const [totalResponses, setTotalResponses] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [overallChartData, departmentChartData, overallRate, responses] = await Promise.all([
          dataService.getOverallParticipationChartData(),
          dataService.getDepartmentParticipationChartData(),
          dataService.getOverallParticipationRate(),
          dataService.getTotalResponses(),
        ])
        setOverallParticipationChartData(overallChartData)
        setDepartmentParticipationChartData(departmentChartData)
        setOverallParticipationRate(overallRate)
        setTotalResponses(responses)
      } catch (error) {
        console.error("Error loading participation data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  if (loading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Participación</h2>
        <p>Cargando datos de participación...</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-8">
      {/* Título del estudio */}
      <h1 className="text-3xl font-bold text-gray-800">Título del estudio</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Métricas clave */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-lg text-gray-700">
            <MessageSquare className="h-6 w-6 text-green-600" />
            <span>
              Número de Respuestas: <strong className="text-gray-900">{totalResponses}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-700">
            <Percent className="h-6 w-6 text-green-600" />
            <span>
              Porcentaje de Participación: <strong className="text-gray-900">{overallParticipationRate}%</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-lg text-gray-700">
            <CalendarDays className="h-6 w-6 text-green-600" />
            <span>Gráficos actualizados: 13/07/2025 - 17:30</span>
          </div>
        </div>

        {/* Gráfico de Donut de Participación General */}
        <div className="flex justify-center items-center">
          <ChartContainer
            config={{
              participado: {
                label: "Participado",
                color: "#388E3C", // Dark Green
              },
              noParticipado: {
                label: "No participado",
                color: "#8BC34A", // Light Green
              },
            }}
            className="h-[300px] w-[300px]"
          >
            <PieChart>
              <Tooltip content={<ChartTooltipContent />} />
              <Legend
                layout="horizontal"
                verticalAlign="top"
                align="center"
                wrapperStyle={{ paddingBottom: "20px" }}
                formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
              />
              <Pie
                data={overallParticipationChartData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                nameKey="name"
                labelLine={false}
                label={renderCustomizedLabel}
              >
                {overallParticipationChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </div>

      {/* Título de la sección de departamentos */}
      <h2 className="text-3xl font-bold text-gray-800 mt-12">Porcentaje de participación «Departamento»</h2>

      {/* Gráfico de Barras Apiladas por Departamento */}
      <div className="w-full h-[400px]">
        <ChartContainer
          config={{
            participation: {
              label: "Participación (%)",
              color: "#388E3C", // Dark Green
            },
            nonParticipation: {
              label: "No participación (%)",
              color: "#8BC34A", // Light Green
            },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={departmentParticipationChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 100, // Increased bottom margin for rotated labels
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="department"
                angle={-45} // Rotate labels
                textAnchor="end" // Anchor text to the end
                interval={0} // Show all labels
                height={100} // Give more height for rotated labels
                tick={{ fontSize: 12 }}
              />
              <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend
                layout="horizontal"
                verticalAlign="top"
                align="center"
                wrapperStyle={{ paddingBottom: "20px" }}
                formatter={(value) => <span className="text-sm text-gray-700">{value}</span>}
              />
              <Bar dataKey="participation" stackId="a" fill="var(--color-participation)" name="Participación (%)" />
              <Bar
                dataKey="nonParticipation"
                stackId="a"
                fill="var(--color-nonParticipation)"
                name="No participación (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Información adicional (manteniendo la estructura anterior) */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Próximamente: Filtros por fechas y departamentos específicos.</p>
        </CardContent>
      </Card>
    </div>
  )
}
