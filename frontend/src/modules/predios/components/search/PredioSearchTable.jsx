import React from "react";
import { useNavigate } from "react-router-dom";

const PredioSearchTable = ({ predios }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="p-3 text-left text-slate-700 dark:text-slate-200">
                Referencia
              </th>
              <th className="p-3 text-left text-slate-700 dark:text-slate-200">
                Titular
              </th>
              <th className="p-3 text-left text-slate-700 dark:text-slate-200">
                Distrito
              </th>
              <th className="p-3 text-left text-slate-700 dark:text-slate-200">
                Manzano
              </th>
              <th className="p-3 text-left text-slate-700 dark:text-slate-200">
                Predio
              </th>
              <th className="p-3 text-center text-slate-700 dark:text-slate-200">
                Acción
              </th>
            </tr>
          </thead>

          <tbody>
            {predios.map((p, index) => (
              <tr
                key={p.referencia_catastral_antigua || index}
                className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <td className="p-3 text-slate-700 dark:text-slate-200">
                  {p.referencia_catastral_antigua || "-"}
                </td>
                <td className="p-3 text-slate-700 dark:text-slate-200">
                  {p.nombre_pp || "-"}
                </td>
                <td className="p-3 text-slate-700 dark:text-slate-200">
                  {p.distrito || "-"}
                </td>
                <td className="p-3 text-slate-700 dark:text-slate-200">
                  {p.manzano || "-"}
                </td>
                <td className="p-3 text-slate-700 dark:text-slate-200">
                  {p.predio || "-"}
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() =>
                      navigate(
                        `/admin/predios/${encodeURIComponent(
                          p.referencia_catastral_antigua
                        )}`
                      )
                    }
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                    disabled={!p.referencia_catastral_antigua}
                  >
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PredioSearchTable;