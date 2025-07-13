// src/main.tsx
// Punto de entrada principal de la aplicación React.
// Renderiza el componente App dentro de un React.StrictMode.
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
