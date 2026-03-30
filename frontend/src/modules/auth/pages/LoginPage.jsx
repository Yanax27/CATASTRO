import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaMapMarkedAlt, FaUser } from "react-icons/fa";
import { login, resetAuthError } from "../authActions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: "",
  });

  const from = useMemo(
    () => location.state?.from?.pathname || "/admin/dashboard",
    [location.state]
  );

  useEffect(() => {
    return () => {
      dispatch(resetAuthError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, from]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const errors = {
      username: "",
      password: "",
    };

    if (!form.username.trim()) {
      errors.username = "Ingrese su usuario.";
    }

    if (!form.password.trim()) {
      errors.password = "Ingrese su contraseña.";
    }

    setFieldErrors(errors);

    return !errors.username && !errors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    await dispatch(
      login({
        username: form.username,
        password: form.password,
      })
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-blue-500/70 via-sky-400/40 to-slate-300/30 dark:from-blue-400/50 dark:via-slate-500/30 dark:to-slate-700/40 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
          <div className="rounded-[28px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 px-6 py-7 sm:px-8 sm:py-8 backdrop-blur-xl">
            <div className="text-center mb-8">
              <div className="mx-auto relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 dark:from-blue-500 dark:to-sky-400 text-white flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold"><FaMapMarkedAlt className="text-lg" /></span>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
              </div>

              <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                Bienvenido
              </h1>

              <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
                Inicie sesión para acceder al sistema catastral
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Usuario
                </label>

                <div
                  className={`flex items-center rounded-2xl border bg-white dark:bg-slate-800 transition ${
                    fieldErrors.username
                      ? "border-red-400 dark:border-red-500"
                      : "border-slate-300 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-500"
                  }`}
                >
                  <span className="pl-4 pr-3 text-slate-400 dark:text-slate-500">
                    <FaUser />
                  </span>

                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    autoComplete="username"
                    placeholder="Ingrese su usuario"
                    className="w-full bg-transparent py-3 pr-4 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                {fieldErrors.username && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                    {fieldErrors.username}
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  Contraseña
                </label>

                <div
                  className={`flex items-center rounded-2xl border bg-white dark:bg-slate-800 transition ${
                    fieldErrors.password
                      ? "border-red-400 dark:border-red-500"
                      : "border-slate-300 dark:border-slate-700 focus-within:border-blue-500 dark:focus-within:border-blue-500"
                  }`}
                >
                  <span className="pl-4 pr-3 text-slate-400 dark:text-slate-500">
                    <FaLock />
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="Ingrese su contraseña"
                    className="w-full bg-transparent py-3 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="px-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition"
                    aria-label={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {fieldErrors.password && (
                  <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              {error && (
                <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-500/60 text-white font-semibold py-3 transition shadow-md shadow-blue-600/20"
              >
                {loading ? "Ingresando..." : "Ingresar"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Acceso restringido solo para usuarios autorizados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;