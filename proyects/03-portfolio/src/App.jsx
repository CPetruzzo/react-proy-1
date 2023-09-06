import React from "react";
import { DarkModeProvider } from "@rbnd/react-dark-mode";
import Settings from "./components/Settings";
import "./App.css"; // Asegúrate de importar el archivo CSS de la aplicación

function App() {
  return (
    <DarkModeProvider>
      <div className="App">
        <Settings />
      </div>
    </DarkModeProvider>
  );
}

export default App;
