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

const PredioSearchCard = ({ predio }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { updateUbicCarpetaLoading } = useSelector((state) => state.predios);
  const { user } = useSelector((state) => state.auth);

  const [modalOpen, setModalOpen] = useState(false);

  // 🔐 CONTROL POR ROL
  const canEditUbicacion = user?.role === "admin";

  const handleViewDetail = () => {
    if (!predio?.referencia_catastral_antigua) return;

    navigate(
      `/admin/predios/${encodeURIComponent(predio.referencia_catastral_antigua)}`
    );
  };

  const handleOpenModal = () => {
    if (!predio?.referencia_catastral_antigua) return;
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    if (updateUbicCarpetaLoading) return;
    setModalOpen(false);
    dispatch(resetUpdateUbicCarpetaState());
  };

  const handleSaveUbicacion = async (ubicacion) => {
    if (!predio?.referencia_catastral_antigua) return;

    if (!ubicacion) return;

    if (ubicacion === predio?.ubic_carpeta) return;

    const result = await Swal.fire({
      title: "Confirmar cambio",
      html: `
        <div style="text-align:left;">
          <p><strong>Predio:</strong> ${predio.referencia_catastral_antigua}</p>
          <p><strong>Ubicación actual:</strong> ${predio.ubic_carpeta || "-"}</p>
          <p><strong>Nueva ubicación:</strong> ${ubicacion}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    const response = await dispatch(
      updateUbicCarpeta(predio.referencia_catastral_antigua, ubicacion)
    );

    if (response?.ok) {
      setModalOpen(false);
      dispatch(resetUpdateUbicCarpetaState());
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-sm text-slate-500 dark:text-slate-400">Referencia</p>
        <p className="font-semibold text-slate-800 dark:text-white break-words">
          {predio?.referencia_catastral_antigua || "-"}
        </p>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
          Titular
        </p>
        <p className="text-slate-700 dark:text-slate-200 break-words">
          {predio?.nombre_pp || "-"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-sm">
          <p className="text-slate-700 dark:text-slate-200">
            <span className="font-semibold">Distrito:</span>{" "}
            {predio?.distrito || "-"}
          </p>
          <p className="text-slate-700 dark:text-slate-200">
            <span className="font-semibold">Manzano:</span>{" "}
            {predio?.manzano || "-"}
          </p>
          <p className="text-slate-700 dark:text-slate-200 sm:col-span-2">
            <span className="font-semibold">Predio:</span>{" "}
            {predio?.predio || "-"}
          </p>
        </div>

        {/* UBICACIÓN */}
        <div className="mt-4 space-y-2">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Ubicación
            </p>
            <div className="mt-1">
              {predio?.ubic_carpeta ? (
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                    ubicacionStyles[predio.ubic_carpeta] ||
                    "bg-gray-100 text-gray-700"
                  }`}
                >
                  {predio.ubic_carpeta}
                </span>
              ) : (
                <span className="text-slate-400 text-sm">-</span>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Desde
            </p>
            <p className="text-slate-700 dark:text-slate-200 text-sm break-words">
              {formatFechaUbicacion(predio?.fecha_rec_carpeta)}
            </p>
          </div>
        </div>

        {/* BOTONES */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleViewDetail}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!predio?.referencia_catastral_antigua}
          >
            Ver detalle
          </button>

          {/* 🔐 SOLO ADMIN */}
          {canEditUbicacion && (
            <button
              onClick={handleOpenModal}
              className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!predio?.referencia_catastral_antigua}
            >
              Editar ubicación
            </button>
          )}
        </div>
      </div>

      <EditUbicacionModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUbicacion}
        predio={predio}
        ubicaciones={UBICACIONES_CARPETA}
        loading={updateUbicCarpetaLoading}
      />
    </>
  );
};

export default PredioSearchCard;