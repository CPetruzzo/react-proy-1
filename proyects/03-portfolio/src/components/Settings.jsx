import React from "react";
import { useDarkMode } from "@rbnd/react-dark-mode";
import "./Settings.css"; // Asegúrate de importar el archivo CSS correspondiente

const Settings = () => {
  const { darkMode, toggle } = useDarkMode();

  return (
    <button
      className={`Button ${darkMode ? "dark-mode" : "light-mode"}`}
      onClick={toggle}
    >
      {darkMode ? "Light" : "Dark"}
    </button>
  );
};

export default Settings;
