"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import LoginPage from "../pages/LoginPage"
import DashboardHomePage from "../pages/DashboardHomePage" // Keep this for "Inicio"
import DashboardPage from "../pages/DashboardPage" // New Dashboard page
import { DashboardLayout } from "../components/DashboardLayout"
import ParticipationPage from "../pages/ParticipationPage"
import ComparisonsPage from "../pages/ComparisonsPage"
import QuestionsPage from "../pages/QuestionsPage"
import ReportsPage from "../pages/ReportsPage"
import BestPracticesPage from "../pages/BestPracticesPage"

export default function AppRoutes() {
  const { isAuthenticated } = useAuth()
  const [currentPage, setCurrentPage] = useState("dashboard") // Default to "Inicio"

  // Si no está autenticado, muestra la página de login
  if (!isAuthenticated) {
    return <LoginPage />
  }

  // Función para renderizar la página actual
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "participation":
        return <ParticipationPage />
      case "analytics": // This is the new Dashboard page
        return <DashboardPage />
      case "comparisons":
        return <ComparisonsPage />
      case "questions":
        return <QuestionsPage />
      case "reports":
        return <ReportsPage />
      case "best-practices":
        return <BestPracticesPage />
      case "dashboard": // "Inicio" page
      default:
        return <DashboardHomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <DashboardLayout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {renderCurrentPage()}
    </DashboardLayout>
  )
}
