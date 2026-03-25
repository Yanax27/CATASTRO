import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ path, label, icon: Icon, isOpen, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      onClick={onClick}
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
      ${
        isActive
          ? "bg-blue-600 text-white shadow-md"
          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      <Icon className="text-lg shrink-0" />
      {isOpen && <span className="truncate">{label}</span>}
    </Link>
  );
};

export default SidebarItem;