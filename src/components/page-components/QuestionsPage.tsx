// src/pages/QuestionsPage.tsx
// Página de ejemplo para la sección "Preguntas".
// Aquí se listarán los ítems de la encuesta con sus métricas detalladas.
interface QuestionsPageProps {
  isPublic?: boolean
}

export function QuestionsPage({ isPublic = false }: QuestionsPageProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Preguntas</h2>
      <p>Aquí se mostrará la lista completa de ítems de encuesta con su media, distribución y tendencia.</p>
      {/* Aquí irían los componentes para listar preguntas y sus métricas */}
    </div>
  )
}

export default QuestionsPage
