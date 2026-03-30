import React, { useEffect, useState } from "react";

const EditUbicacionModal = ({
  open,
  onClose,
  onSave,
  predio,
  ubicaciones = [],
  loading = false,
}) => {
  const [ubicacion, setUbicacion] = useState("");

  useEffect(() => {
    if (predio?.ubic_carpeta) {
      setUbicacion(predio.ubic_carpeta);
    } else {
      setUbicacion("");
    }
  }, [predio]);

  if (!open || !predio) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(ubicacion);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Editar ubicación
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Predio: {predio.referencia_catastral_antigua || "-"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Ubicación de carpeta
            </label>

            <select
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione una ubicación</option>
              {ubicaciones.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-sm text-slate-600 dark:text-slate-300">
            La fecha y hora de ubicación se actualizarán automáticamente al guardar.
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading || !ubicacion}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white transition"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUbicacionModal;