import React from "react";

const PredioSearchFilters = ({
  filters,
  onChange,
  onSearch,
  onClear,
  loading,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
        Búsqueda Catastral
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="referencia_catastral"
          placeholder="Referencia catastral Antigua Ej: 01-001-001"
          value={filters.referencia_catastral}
          onChange={onChange}
          className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
        />

        <input
          type="text"
          name="nombre_titular"
          placeholder="Nombre del titular Ej: Juan Perez"
          value={filters.nombre_titular}
          onChange={onChange}
          className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
        />
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={onSearch}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>

        <button
          onClick={onClear}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
};

export default PredioSearchFilters;