"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Users, ClipboardList, Trophy, Filter } from "lucide-react"
import {
  dataService,
  type DashboardParticipationOverview,
  type IndicatorResult,
  type SatisfactionIndex,
} from "../../services/dataService"

export default function DashboardPage() {
  const [participationOverview, setParticipationOverview] = useState<DashboardParticipationOverview | null>(null)
  const [indicatorResults, setIndicatorResults] = useState<IndicatorResult[]>([])
  const [satisfactionIndex, setSatisfactionIndex] = useState<SatisfactionIndex | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [overview, indicators, satisfaction] = await Promise.all([
          dataService.getDashboardParticipationOverview(),
          dataService.getIndicatorResults(),
          dataService.getSatisfactionIndex(),
        ])
        setParticipationOverview(overview)
        setIndicatorResults(indicators)
        setSatisfactionIndex(satisfaction)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const participationChartData = participationOverview
    ? [
        {
          name: "Participantes",
          value: participationOverview.participantPercentage,
          count: participationOverview.participants,
          color: "#4CAF50",
        },
        {
          name: "Total Empleados",
          value: participationOverview.employeePercentage,
          count: participationOverview.totalEmployees - participationOverview.participants,
          color: "#81C784",
        },
      ]
    : []

  const satisfactionChartData = satisfactionIndex
    ? [
        { name: "Satisfecho", value: satisfactionIndex.value, color: "#4CAF50" },
        { name: "No Satisfecho", value: 100 - satisfactionIndex.value, color: "#E8F5E8" },
      ]
    : []

  // Custom label renderer for bar chart
  const renderBarLabel = (props: any) => {
    const { x, y, width, value } = props
    return (
      <text x={x + width + 5} y={y + 10} fill="#666" fontSize="12" textAnchor="start">
        {value} %
      </text>
    )
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-12 bg-gray-200 rounded w-full"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <div className="h-80 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Top Filters */}
      <div className="flex flex-col lg:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Area</label>
            <Select defaultValue="Todas">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Centro</label>
            <Select defaultValue="Todas">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Responsabilidad</label>
            <Select defaultValue="Todas">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="outline" className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 px-6">
          Global
        </Button>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* % Participación */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">% Participación</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Users className="h-10 w-10 text-gray-600 mb-4" />
              <div className="relative">
                <ChartContainer
                  config={{
                    Participantes: { label: "Participantes", color: "#4CAF50" },
                    "Total Empleados": { label: "Total Empleados", color: "#81C784" },
                  }}
                  className="h-[220px] w-[220px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={participationChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={0}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {participationChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                {/* Overlay text */}
                {participationOverview && (
                  <>
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="text-sm text-gray-600 font-medium">
                        {participationOverview.totalEmployees - participationOverview.participants}
                      </div>
                      <div className="text-xs text-gray-500">
                        ({participationOverview.employeePercentage.toFixed(2)}%)
                      </div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="text-2xl font-bold text-gray-800">
                        {participationOverview.participantPercentage.toFixed(2)}%
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="text-sm text-gray-600 font-medium">{participationOverview.participants}</div>
                      <div className="text-xs text-gray-500">
                        ({participationOverview.participantPercentage.toFixed(2)}%)
                      </div>
                    </div>
                  </>
                )}
              </div>
              {/* Legend */}
              <div className="flex flex-col items-start mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                  <span className="text-sm text-gray-600">Participantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#81C784]"></div>
                  <span className="text-sm text-gray-600">Total Empleados</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Índice de satisfacción general */}
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Índice de satisfacción general</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-4">
                <ChartContainer
                  config={{
                    Satisfecho: { label: "Satisfecho", color: "#4CAF50" },
                  }}
                  className="h-[120px] w-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={satisfactionChartData}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={0}
                        dataKey="value"
                      >
                        {satisfactionChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                {/* Overlay text */}
                {satisfactionIndex && (
                  <>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="text-3xl font-bold text-gray-800">{satisfactionIndex.value} %</div>
                    </div>
                    <div className="absolute bottom-0 left-0 text-xs text-gray-500">0 %</div>
                    <div className="absolute bottom-0 right-0 text-xs text-gray-500">100 %</div>
                  </>
                )}
              </div>
              <Trophy className="h-10 w-10 text-gray-600 mb-3" />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
                <span>Filtros:</span>
                <span className="text-xs">Múltiples valores</span>
                <span className="text-xs">Múltiples valores</span>
                <span className="text-xs">Múltiples valores</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column */}
        <div className="flex flex-col justify-center items-center space-y-12">
          <div className="text-center">
            <Users className="h-20 w-20 text-gray-600 mx-auto mb-3" />
            <div className="text-7xl font-bold text-gray-800 mb-2">{participationOverview?.participants}</div>
            <div className="text-lg text-gray-600">Participantes</div>
          </div>
          <div className="text-center">
            <ClipboardList className="h-20 w-20 text-gray-600 mx-auto mb-3" />
            <div className="text-7xl font-bold text-gray-800 mb-2">
              {participationOverview?.participantPercentage.toFixed(0)} %
            </div>
            <div className="text-lg text-gray-600">% Participacion</div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <Card className="bg-white shadow-sm h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-gray-800">Resultado de los indicadores</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ChartContainer
                config={{
                  value: { label: "Porcentaje", color: "#4CAF50" },
                }}
                className="h-[700px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={indicatorResults}
                    layout="vertical"
                    margin={{ top: 5, right: 50, left: 150, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={false} hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#666" }}
                      width={140}
                    />
                    <ReferenceLine x={100} stroke="#ddd" strokeDasharray="2 2" />
                    <Bar dataKey="value" fill="#4CAF50" radius={[0, 2, 2, 0]}>
                      <LabelList content={renderBarLabel} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
