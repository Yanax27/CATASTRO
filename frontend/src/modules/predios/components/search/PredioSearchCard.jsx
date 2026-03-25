import React from "react";
import { useNavigate } from "react-router-dom";

const PredioSearchCard = ({ predio }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    if (!predio?.referencia_catastral_antigua) return;

    navigate(
      `/admin/predios/${encodeURIComponent(predio.referencia_catastral_antigua)}`
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <p className="text-sm text-slate-500 dark:text-slate-400">Referencia</p>
      <p className="font-semibold text-slate-800 dark:text-white">
        {predio?.referencia_catastral_antigua || "-"}
      </p>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
        Titular
      </p>
      <p className="text-slate-700 dark:text-slate-200">
        {predio?.nombre_pp || "-"}
      </p>

      <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
        <p className="text-slate-700 dark:text-slate-200">
          <span className="font-semibold">Distrito:</span>{" "}
          {predio?.distrito || "-"}
        </p>
        <p className="text-slate-700 dark:text-slate-200">
          <span className="font-semibold">Manzano:</span>{" "}
          {predio?.manzano || "-"}
        </p>
        <p className="text-slate-700 dark:text-slate-200">
          <span className="font-semibold">Predio:</span> {predio?.predio || "-"}
        </p>
      </div>

      <button
        onClick={handleViewDetail}
        className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!predio?.referencia_catastral_antigua}
      >
        Ver detalle
      </button>
    </div>
  );
};

export default PredioSearchCard;