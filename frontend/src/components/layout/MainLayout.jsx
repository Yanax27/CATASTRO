import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const openMobileSidebar = () => setMobileOpen(true);
  const closeMobileSidebar = () => setMobileOpen(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex">
      <Sidebar
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        mobileOpen={mobileOpen}
        closeMobileSidebar={closeMobileSidebar}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Navbar
          openMobileSidebar={openMobileSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;