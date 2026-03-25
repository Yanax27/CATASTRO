import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPredioDetail, resetPredioDetail } from "../predioActions";
import PredioReportView from "../components/view/PredioReportView";

const PredioViewPage = () => {
  const { referenciaCatastral } = useParams();
  const dispatch = useDispatch();

  const { predioSeleccionado, loading, error } = useSelector(
    (state) => state.predios
  );

  useEffect(() => {
    if (referenciaCatastral) {
      dispatch(getPredioDetail(referenciaCatastral));
    }

    return () => {
      dispatch(resetPredioDetail());
    };
  }, [dispatch, referenciaCatastral]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-slate-600 dark:text-slate-300">Cargando predio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-red-200 dark:border-red-900 shadow-sm">
        <p className="text-red-600 dark:text-red-400">
          Error: {error}
        </p>
      </div>
    );
  }

  if (!predioSeleccionado) {
    return (
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-slate-600 dark:text-slate-300">
          No se encontró el predio.
        </p>
      </div>
    );
  }

  return <PredioReportView predio={predioSeleccionado} />;
};

export default PredioViewPage;