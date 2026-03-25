import React from "react";

const PredioOwnerInfo = ({ predio }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <div className="text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Identificación del titular
        </p>

        <h2 className="text-lg font-semibold text-slate-800 dark:text-white mt-1">
          {predio?.nombre_pp || "Sin información"}
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
        <p>
          <span className="font-medium">N° Inmueble:</span>{" "}
          {predio?.n_inmueble || "-"}
        </p>

        <p>
          <span className="font-medium">Referencia:</span>{" "}
          {predio?.referencia_catastral_antigua || "-"}
        </p>
      </div>
    </div>
  );
};

export default PredioOwnerInfo;