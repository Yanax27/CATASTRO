import React from "react";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Navbar = ({ openMobileSidebar, darkMode, toggleDarkMode }) => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("/dashboard")) return "Dashboard";
    if (location.pathname.includes("/predios")) return "Búsqueda Catastral";
    return "Sistema Catastral";
  };

  return (
    <nav className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={openMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <FaBars className="text-lg" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white truncate">
            {getTitle()}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
            Gestión y consulta de datos catastrales
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleDarkMode}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          <span className="hidden sm:inline text-sm font-medium">
            {darkMode ? "Claro" : "Oscuro"}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;