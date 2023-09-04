import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary"; // Asegúrate de importar el componente ErrorBoundary
import { FiltersProvider } from "./context/filters.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FiltersProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>{" "}
    </FiltersProvider>
  </React.StrictMode>
);
