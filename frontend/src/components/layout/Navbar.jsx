import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaMoon, FaSun, FaUserCircle, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../modules/auth/authActions";

const Navbar = ({ openMobileSidebar, darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const menuRef = useRef(null);

  const getTitle = () => {
    if (location.pathname.includes("/dashboard")) return "Dashboard";
    if (location.pathname.includes("/predios")) return "Búsqueda Catastral";
    return "Sistema Catastral";
  };

  const formatRole = (role) => {
    if (!role) return "-";
    if (role === "admin") return "Administrador";
    if (role === "user") return "Consulta";
    return role;
  };

  const handleLogout = async () => {
    const result = await dispatch(logout());

    if (result?.ok) {
      setOpenUserMenu(false);
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenUserMenu((prev) => !prev)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition max-w-[220px]"
          >
            <FaUserCircle className="text-lg shrink-0" />
            <div className="hidden sm:block text-left min-w-0">
              <p className="text-sm font-medium truncate">
                {user?.name || user?.username || "Usuario"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {formatRole(user?.role)}
              </p>
            </div>
            <FaChevronDown className="text-xs opacity-70 shrink-0" />
          </button>

          {openUserMenu && (
            <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
              <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-300">
                    <FaUserCircle className="text-2xl" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                      {user?.name || "Usuario"}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      @{user?.username || "-"}
                    </p>
                    <p className="text-xs mt-1 inline-flex px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {formatRole(user?.role)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition disabled:opacity-60"
                >
                  <FaSignOutAlt />
                  <span className="text-sm font-medium">
                    {loading ? "Cerrando sesión..." : "Cerrar sesión"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;