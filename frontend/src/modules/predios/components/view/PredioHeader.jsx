import React from "react";

const PredioHeader = ({ predio }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <h2 className="text-lg font-bold text-center text-slate-800 dark:text-white">
        REGISTRO CATASTRAL
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4 text-sm text-slate-700 dark:text-slate-200">
        <p><b>Distrito:</b> {predio.distrito || "-"}</p>
        <p><b>Manzano:</b> {predio.manzano || "-"}</p>
        <p><b>Lote:</b> {predio.predio || "-"}</p>
        <p><b>Zona:</b> {predio.zona || "-"}</p>
        <p><b>Código:</b> {predio.referencia_catastral_antigua || "-"}</p>
      </div>
    </div>
  );
};

export default PredioHeader;