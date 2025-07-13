// src/services/dataService.ts
// Servicio para simular datos de la aplicación usando localStorage
// En un entorno real, estos datos vendrían de una API

export interface ParticipationData {
  department: string
  responses: number
  surveyed: number
  participationRate: number
}

export interface OverallParticipationData {
  name: string
  value: number
  color: string
}

export interface DepartmentParticipationChartData {
  department: string
  participation: number // Percentage
  nonParticipation: number // Percentage
}

export interface KPIData {
  enps: number
  satisfaction: number
  engagement: number
  evolution: number
}

export interface QuestionData {
  id: string
  question: string
  average: number
  distribution: number[]
  trend: "up" | "down" | "stable"
}

export interface ReportData {
  id: string
  title: string
  type: "PDF" | "Excel"
  uploadDate: string
  isNew: boolean
  category: string // New field for report category
  subCategory?: string // New field for sub-category
}

export interface BestPractice {
  id: string
  title: string
  description: string
  url: string
}

// Nuevas interfaces para el Dashboard
export interface DashboardParticipationOverview {
  participants: number
  totalEmployees: number
  participantPercentage: number
  employeePercentage: number
}

export interface IndicatorResult {
  name: string
  value: number // Percentage
}

export interface SatisfactionIndex {
  value: number // Percentage
}

// Datos mock para demostración
const MOCK_PARTICIPATION_DATA: ParticipationData[] = [
  { department: "Recursos Humanos", responses: 45, surveyed: 50, participationRate: 90 },
  { department: "Ventas", responses: 78, surveyed: 85, participationRate: 91.8 },
  { department: "Marketing", responses: 32, surveyed: 40, participationRate: 80 },
  { department: "IT", responses: 67, surveyed: 70, participationRate: 95.7 },
  { department: "Finanzas", responses: 28, surveyed: 30, participationRate: 93.3 },
]

const MOCK_OVERALL_PARTICIPATION_RATE = 60 // From image
const MOCK_TOTAL_RESPONSES = 78 // From image

const MOCK_OVERALL_PARTICIPATION_CHART_DATA: OverallParticipationData[] = [
  { name: "Participado", value: MOCK_OVERALL_PARTICIPATION_RATE, color: "#388E3C" }, // Dark Green
  { name: "No participado", value: 100 - MOCK_OVERALL_PARTICIPATION_RATE, color: "#8BC34A" }, // Light Green
]

const MOCK_DEPARTMENT_PARTICIPATION_CHART_DATA: DepartmentParticipationChartData[] = [
  { department: "Asesoría Jurídica / Asistente de Dirección", participation: 15, nonParticipation: 85 },
  { department: "COMEX", participation: 10, nonParticipation: 90 },
  { department: "Dirección Editorial de Productos y Servicios Educativos", participation: 20, nonParticipation: 80 },
  { department: "Dirección de Estrategia y Desarrollo de Negocio", participation: 25, nonParticipation: 75 },
  { department: "Dirección de Operaciones", participation: 30, nonParticipation: 70 },
  { department: "Dirección de Personas y Gestión SSGG", participation: 35, nonParticipation: 65 },
  { department: "Dirección de Tecnología", participation: 40, nonParticipation: 60 },
  { department: "Dirección Edición General", participation: 45, nonParticipation: 55 },
  { department: "Dirección Gestión Económica-Financiera", participation: 50, nonParticipation: 50 },
  { department: "Dirección Ventas", participation: 55, nonParticipation: 45 },
]

const MOCK_KPI_DATA: KPIData = {
  enps: 42,
  satisfaction: 7.8,
  engagement: 8.2,
  evolution: 5.3,
}

const MOCK_QUESTIONS_DATA: QuestionData[] = [
  {
    id: "q1",
    question: "¿Qué tan satisfecho estás con tu trabajo actual?",
    average: 7.5,
    distribution: [2, 5, 8, 15, 25, 30, 15],
    trend: "up",
  },
  {
    id: "q2",
    question: "¿Recomendarías tu empresa como un buen lugar para trabajar?",
    average: 8.1,
    distribution: [1, 3, 5, 12, 20, 35, 24],
    trend: "stable",
  },
  {
    id: "q3",
    question: "¿Sientes que tu trabajo es valorado por tu supervisor?",
    average: 6.9,
    distribution: [5, 8, 12, 18, 22, 25, 10],
    trend: "down",
  },
]

const MOCK_REPORTS_DATA: ReportData[] = [
  {
    id: "r1",
    title: "Informe de Clima Laboral Q4 2024",
    type: "PDF",
    uploadDate: "2024-12-15",
    isNew: true,
    category: "Informes",
    subCategory: "Comparativa anual",
  },
  {
    id: "r2",
    title: "Análisis de Engagement por Departamento",
    type: "Excel",
    uploadDate: "2024-12-10",
    isNew: true,
    category: "Análisis",
    subCategory: "Análisis de KPI",
  },
  {
    id: "r3",
    title: "Resultados eNPS Noviembre 2024",
    type: "PDF",
    uploadDate: "2024-11-30",
    isNew: false,
    category: "Informes",
    subCategory: "Evolución temporal",
  },
  {
    id: "r4",
    title: "Documento de Políticas de RRHH",
    type: "PDF",
    uploadDate: "2024-11-20",
    isNew: false,
    category: "Documentos",
  },
  {
    id: "r5",
    title: "Nóminas Diciembre 2024",
    type: "Excel",
    uploadDate: "2024-12-28",
    isNew: true,
    category: "Nóminas",
  },
  {
    id: "r6",
    title: "Guía de Onboarding RRHH",
    type: "PDF",
    uploadDate: "2024-10-01",
    isNew: false,
    category: "RRHH",
  },
  {
    id: "r7",
    title: "Alerta Automática de Bajas",
    type: "PDF",
    uploadDate: "2025-01-05",
    isNew: true,
    category: "Análisis",
    subCategory: "Alertas automáticas",
  },
]

const MOCK_BEST_PRACTICES_DATA: BestPractice[] = [
  {
    id: "bp1",
    title: "Guía Completa para Mejorar el Engagement Laboral",
    description: "Descubre estrategias probadas para aumentar la motivación y el compromiso de tus empleados.",
    url: "https://www.ejemplo.com/guia-engagement",
  },
  {
    id: "bp2",
    title: "Liderazgo Transformacional: Claves para Inspirar a tu Equipo",
    description: "Aprende cómo un estilo de liderazgo transformacional puede impulsar el rendimiento y la innovación.",
    url: "https://www.ejemplo.com/liderazgo-transformacional",
  },
  {
    id: "bp3",
    title: "Cómo Fomentar una Cultura de Feedback Positivo",
    description:
      "Consejos prácticos para implementar una cultura de retroalimentación constructiva en tu organización.",
    url: "https://www.ejemplo.com/cultura-feedback",
  },
  {
    id: "bp4",
    title: "Bienestar Emocional en el Trabajo: Estrategias para RRHH",
    description: "Explora iniciativas para apoyar la salud mental y el bienestar de tus colaboradores.",
    url: "https://www.ejemplo.com/bienestar-emocional",
  },
  {
    id: "bp5",
    title: "Optimización de Procesos de Onboarding para Nuevos Talentos",
    description:
      "Mejora la experiencia de incorporación de nuevos empleados para asegurar su éxito desde el primer día.",
    url: "https://www.ejemplo.com/onboarding-optimizacion",
  },
]

// Nuevos datos mock para el dashboard
const MOCK_DASHBOARD_PARTICIPATION_OVERVIEW: DashboardParticipationOverview = {
  participants: 262,
  totalEmployees: 370, // 262 / 0.7081 = ~370
  participantPercentage: 70.81,
  employeePercentage: 29.19,
}

const MOCK_INDICATOR_RESULTS: IndicatorResult[] = [
  { name: "Alineamiento estratégico", value: 75 },
  { name: "Compromiso", value: 76 },
  { name: "Sostenibilidad", value: 81 },
  { name: "Fidelidad", value: 78 },
  { name: "Dirección de personas", value: 70 },
  { name: "Ética laboral", value: 80 },
  { name: "Desempeño", value: 62 },
  { name: "Autonomía", value: 83 },
  { name: "Onboarding", value: 80 },
  { name: "Aprendizaje & Desarrollo p...", value: 72 },
  { name: "Igualdad de oportunidades", value: 65 },
  { name: "Calidad", value: 87 },
  { name: "Colaboración organizativa", value: 83 },
  { name: "Comunicación interna", value: 63 },
  { name: "Dinámica organizativa", value: 76 },
  { name: "Mejora continua", value: 71 },
  { name: "Instalaciones & Seguridad", value: 75 },
  { name: "Compensación & beneficios", value: 48 },
  { name: "Conciliación vida profesion...", value: 56 },
  { name: "Bienestar", value: 76 },
]

const MOCK_SATISFACTION_INDEX: SatisfactionIndex = {
  value: 73,
}

export const dataService = {
  getParticipationData: (): Promise<ParticipationData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PARTICIPATION_DATA), 500)
    })
  },

  getOverallParticipationChartData: (): Promise<OverallParticipationData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_OVERALL_PARTICIPATION_CHART_DATA), 300)
    })
  },

  getDepartmentParticipationChartData: (): Promise<DepartmentParticipationChartData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DEPARTMENT_PARTICIPATION_CHART_DATA), 400)
    })
  },

  getKPIData: (): Promise<KPIData> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_KPI_DATA), 300)
    })
  },

  getQuestionsData: (): Promise<QuestionData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_QUESTIONS_DATA), 400)
    })
  },

  getReportsData: (): Promise<ReportData[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_REPORTS_DATA), 200)
    })
  },

  getBestPracticesData: (): Promise<BestPractice[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_BEST_PRACTICES_DATA), 300)
    })
  },

  getOverallParticipationRate: (): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_OVERALL_PARTICIPATION_RATE), 100)
    })
  },

  getTotalResponses: (): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_TOTAL_RESPONSES), 100)
    })
  },

  // Nuevas funciones para el dashboard
  getDashboardParticipationOverview: (): Promise<DashboardParticipationOverview> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DASHBOARD_PARTICIPATION_OVERVIEW), 300)
    })
  },

  getIndicatorResults: (): Promise<IndicatorResult[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_INDICATOR_RESULTS), 400)
    })
  },

  getSatisfactionIndex: (): Promise<SatisfactionIndex> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_SATISFACTION_INDEX), 200)
    })
  },
}
