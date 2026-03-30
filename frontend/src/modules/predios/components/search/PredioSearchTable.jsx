import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import EditUbicacionModal from "./EditUbicacionModal";
import { UBICACIONES_CARPETA } from "../../prediosApi";
import {
  updateUbicCarpeta,
  resetUpdateUbicCarpetaState,
} from "../../predioActions";

const ubicacionStyles = {
  Ventanilla: "bg-blue-100 text-blue-800",
  Geomatica: "bg-purple-100 text-purple-800",
  "Unidad Campo": "bg-green-100 text-green-800",
  Secretaria: "bg-yellow-100 text-yellow-800",
  "Asesoria Legal": "bg-red-100 text-red-800",
  Archivos: "bg-slate-200 text-slate-800",
  Otros: "bg-gray-100 text-gray-700",
};

const formatFechaUbicacion = (fecha) => {
  if (!fecha) return "-";
  return fecha.replace("T", " ").replace(".000Z", "").slice(0, 16);
};

const PredioSearchTable = ({ predios }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { updateUbicCarpetaLoading } = useSelector((state) => state.predios);
  const { user } = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);
  const [predioSelected, setPredioSelected] = useState(null);

  // Solo el rol admin puede editar ubicación
  const canEditUbicacion = user?.role === "admin";

  const openEditModal = (predio) => {
    setPredioSelected(predio);
    setModalOpen(true);
  };

  const closeEditModal = () => {
    if (updateUbicCarpetaLoading) return;
    setModalOpen(false);
    setPredioSelected(null);
    dispatch(resetUpdateUbicCarpetaState());
  };

  const handleSaveUbicacion = async (ubicacion) => {
    if (!predioSelected?.referencia_catastral_antigua) return;
    if (!ubicacion) return;
    if (ubicacion === predioSelected?.ubic_carpeta) return;

    const result = await Swal.fire({
      title: "Confirmar cambio",
      html: `
        <div style="text-align:left;">
          <p><strong>Predio:</strong> ${predioSelected.referencia_catastral_antigua}</p>
          <p><strong>Ubicación actual:</strong> ${predioSelected.ubic_carpeta || "-"}</p>
          <p><strong>Nueva ubicación:</strong> ${ubicacion}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
      focusCancel: true,
    });

    if (!result.isConfirmed) return;

    const response = await dispatch(
      updateUbicCarpeta(
        predioSelected.referencia_catastral_antigua,
        ubicacion
      )
    );

    if (response?.ok) {
      setModalOpen(false);
      setPredioSelected(null);
      dispatch(resetUpdateUbicCarpetaState());
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
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
                <th className="p-3 text-left text-slate-700 dark:text-slate-200">
                  Ubicación
                </th>
                <th className="p-3 text-left text-slate-700 dark:text-slate-200">
                  Desde
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

                  <td className="p-3">
                    {p.ubic_carpeta ? (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          ubicacionStyles[p.ubic_carpeta] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {p.ubic_carpeta}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>

                  <td className="p-3 text-slate-700 dark:text-slate-200">
                    {formatFechaUbicacion(p.fecha_rec_carpeta)}
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
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

                      {canEditUbicacion && (
                        <button
                          onClick={() => openEditModal(p)}
                          className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition"
                          disabled={!p.referencia_catastral_antigua}
                        >
                          Editar ubicación
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EditUbicacionModal
        open={modalOpen}
        onClose={closeEditModal}
        onSave={handleSaveUbicacion}
        predio={predioSelected}
        ubicaciones={UBICACIONES_CARPETA}
        loading={updateUbicCarpetaLoading}
      />
    </>
  );
};

export default PredioSearchTable;