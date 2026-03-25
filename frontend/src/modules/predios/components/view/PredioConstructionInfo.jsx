import React from "react";

const PredioConstructionInfo = ({ predio }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold mb-3 text-slate-800 dark:text-white">
        Construcción
      </h3>

      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
        <p>
          <span className="font-medium">Superficie construida:</span>{" "}
          {predio.superficie_construida ?? "-"}
        </p>
        <p>
          <span className="font-medium">Superficie ocupada:</span>{" "}
          {predio.superficie_ocupada ?? "-"}
        </p>
        <p>
          <span className="font-medium">Frente:</span> {predio.frente ?? "-"}
        </p>
        <p>
          <span className="font-medium">Fondo:</span> {predio.fondo ?? "-"}
        </p>
      </div>
    </div>
  );
};

export default PredioConstructionInfo;