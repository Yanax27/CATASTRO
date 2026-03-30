import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Dashboard from "../pages/Dashboard";

// Auth
import LoginPage from "../modules/auth/pages/LoginPage";

// Predios
import PrediosSearchPage from "../modules/predios/pages/PrediosSearchPage";
import PredioViewPage from "../modules/predios/pages/PredioViewPage";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Rutas privadas */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "user"]} />}>
        <Route path="/admin/*" element={<MainLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="predios" element={<PrediosSearchPage />} />
          <Route
            path="predios/:referenciaCatastral"
            element={<PredioViewPage />}
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;