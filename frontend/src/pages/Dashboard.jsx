import React, { useEffect, useMemo } from "react";
import {
  FaDatabase,
  FaFolderOpen,
  FaMapMarkedAlt,
  FaArchive,
  FaClipboardList,
  FaUserShield,
  FaClock,
  FaChartBar,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardResumen } from "../modules/predios/predioActions";

const ubicacionMeta = {
  Ventanilla: {
    label: "Ventanilla",
    icon: <FaFolderOpen />,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    bar: "bg-blue-500",
  },
  Geomatica: {
    label: "Geomatica",
    icon: <FaMapMarkedAlt />,
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
    bar: "bg-purple-500",
  },
  "Unidad Campo": {
    label: "Unidad Campo",
    icon: <FaClipboardList />,
    color:
      "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300",
    bar: "bg-green-500",
  },
  Secretaria: {
    label: "Secretaria",
    icon: <FaClipboardList />,
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300",
    bar: "bg-yellow-500",
  },
  "Asesoria Legal": {
    label: "Asesoria Legal",
    icon: <FaUserShield />,
    color: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    bar: "bg-red-500",
  },
  Archivos: {
    label: "Archivos",
    icon: <FaArchive />,
    color:
      "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    bar: "bg-slate-500",
  },
  Otros: {
    label: "Otros",
    icon: <FaFolderOpen />,
    color:
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    bar: "bg-gray-500",
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {
    dashboardResumen,
    dashboardResumenLoading,
    dashboardResumenError,
  } = useSelector((state) => state.predios);

  useEffect(() => {
    dispatch(getDashboardResumen());
  }, [dispatch]);

  const totalUbicados = useMemo(() => {
    return Object.values(dashboardResumen.ubicaciones || {}).reduce(
      (acc, value) => acc + Number(value || 0),
      0
    );
  }, [dashboardResumen]);

  const porcentajeUbicados = useMemo(() => {
    if (!dashboardResumen.totalPredios) return 0;
    return Math.round((totalUbicados / dashboardResumen.totalPredios) * 100);
  }, [dashboardResumen, totalUbicados]);

  const cardsResumen = [
    {
      title: "Total de predios",
      value: dashboardResumen.totalPredios,
      subtitle: "Registros catastrales disponibles",
      icon: <FaDatabase />,
      color:
        "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
    },
    {
      title: "En Archivos",
      value: dashboardResumen.ubicaciones?.Archivos || 0,
      subtitle: "Carpetas actualmente archivadas",
      icon: <FaArchive />,
      color:
        "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    },
    {
      title: "En Geomatica",
      value: dashboardResumen.ubicaciones?.Geomatica || 0,
      subtitle: "Carpetas en revisión técnica",
      icon: <FaMapMarkedAlt />,
      color:
        "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300",
    },
    {
      title: "Sin ubicación",
      value: dashboardResumen.sinUbicacion,
      subtitle: "Registros que requieren asignación",
      icon: <FaFolderOpen />,
      color:
        "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300",
    },
  ];

  const ubicacionesOrdenadas = Object.entries(
    dashboardResumen.ubicaciones || {}
  ).map(([key, value]) => ({
    key,
    value: Number(value || 0),
    ...ubicacionMeta[key],
    percent: dashboardResumen.totalPredios
      ? Math.round((Number(value || 0) / dashboardResumen.totalPredios) * 100)
      : 0,
  }));

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-sky-500/5 to-transparent dark:from-blue-500/10 dark:via-sky-400/5 dark:to-transparent" />
        <div className="relative p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Panel de control
              </p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                Bienvenido{user?.name ? `, ${user.name}` : ""}
              </h2>
              <p className="mt-2 max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Visualiza el estado general de las carpetas físicas, distribución
                por ubicación y actividad reciente del sistema catastral.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 px-4 py-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Usuario actual
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white break-words">
                  {user?.username || "-"}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 px-4 py-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Rol
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-white">
                  {user?.role === "admin" ? "Administrador" : "Consulta"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {dashboardResumenError && (
        <div className="rounded-2xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          {dashboardResumenError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cardsResumen.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {card.title}
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
                  {dashboardResumenLoading ? "..." : card.value}
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {card.subtitle}
                </p>
              </div>

              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center text-lg ${card.color}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 flex items-center justify-center">
              <FaChartBar />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Distribución por ubicación
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Estado actual de carpetas físicas por área
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {ubicacionesOrdenadas.map((item) => (
              <div key={item.key}>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`inline-flex w-8 h-8 rounded-lg items-center justify-center text-sm ${item.color}`}
                    >
                      {item.icon}
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                      {item.label}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-sm font-semibold text-slate-800 dark:text-white">
                      {dashboardResumenLoading ? "..." : item.value}
                    </span>
                    <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                      {dashboardResumenLoading ? "" : `${item.percent}%`}
                    </span>
                  </div>
                </div>

                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.bar} transition-all duration-500`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 flex items-center justify-center">
              <FaClock />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Resumen operativo
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Indicadores útiles del sistema
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 px-4 py-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Registros con ubicación asignada
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
                {dashboardResumenLoading ? "..." : `${porcentajeUbicados}%`}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 px-4 py-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Actualizados hoy
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
                {dashboardResumenLoading ? "..." : dashboardResumen.actualizadosHoy}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 px-4 py-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Actualizados últimos 7 días
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
                {dashboardResumenLoading
                  ? "..."
                  : dashboardResumen.actualizadosUltimos7Dias}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 px-4 py-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total ubicados
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
                {dashboardResumenLoading ? "..." : totalUbicados}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;