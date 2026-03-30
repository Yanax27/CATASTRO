import React from "react";
import { useNavigate } from "react-router-dom";
import PredioHeader from "./PredioHeader";
import PredioOwnerInfo from "./PredioOwnerInfo";
import PredioCharacteristics from "./PredioCharacteristics";
import PredioMapPanel from "./PredioMapPanel";
import PredioConstructionInfo from "./PredioConstructionInfo";
import PredioPhotoPanel from "./PredioPhotoPanel";

const PredioReportView = ({ predio }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/predios")}
          className="
            inline-flex items-center gap-2
            px-4 py-2.5 rounded-xl
            bg-blue-600 text-white font-medium
            shadow-sm
            hover:bg-blue-700 hover:shadow-md
            active:scale-[0.98]
            transition-all duration-200
          "
        >
          ← Volver a búsqueda
        </button>

        <span className="text-sm text-slate-500 dark:text-slate-400">
          {predio?.referencia_catastral_antigua}
        </span>
      </div>

      <PredioHeader predio={predio} />
      <PredioOwnerInfo predio={predio} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-4">
          <PredioCharacteristics predio={predio} />
          <PredioConstructionInfo predio={predio} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <PredioMapPanel predio={predio} />
          {/*<PredioPhotoPanel />*/}
        </div>
      </div>
    </div>
  );
};

export default PredioReportView;