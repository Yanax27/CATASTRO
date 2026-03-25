import React from "react";
import { FaBars, FaTimes, FaMapMarkedAlt } from "react-icons/fa";
import SidebarItem from "./SidebarItem";
import { sidebarData } from "./sidebarData";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  mobileOpen,
  closeMobileSidebar,
}) => {
  return (
    <>
      {/* Overlay móvil */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar móvil */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white dark:bg-slate-900 shadow-xl border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 lg:hidden
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-xl">
              <FaMapMarkedAlt className="text-lg" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800 dark:text-white">
                Catastro
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sistema de búsqueda
              </p>
            </div>
          </div>

          <button
            onClick={closeMobileSidebar}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
          {sidebarData.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              isOpen={true}
              onClick={closeMobileSidebar}
            />
          ))}
        </div>
      </aside>

      {/* Sidebar desktop */}
      <aside
        className={`hidden lg:flex h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 flex-col
        ${isOpen ? "w-64" : "w-20"}`}
      >
        <div className="h-16 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-blue-600 text-white p-2 rounded-xl shrink-0">
              <FaMapMarkedAlt className="text-lg" />
            </div>

            {isOpen && (
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white truncate">
                  Catastro
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Sistema de búsqueda
                </p>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FaBars className="text-lg" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarData.map((item) => (
            <SidebarItem key={item.path} {...item} isOpen={isOpen} />
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;