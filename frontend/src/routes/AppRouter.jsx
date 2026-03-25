import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";

// Predios
import PrediosSearchPage from "../modules/predios/pages/PrediosSearchPage";
import PredioViewPage from "../modules/predios/pages/PredioViewPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="/admin/*" element={<MainLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="predios" element={<PrediosSearchPage />} />
        <Route
          path="predios/:referenciaCatastral"
          element={<PredioViewPage />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AppRouter;