import React from "react";

const Dashboard = () => {
  return (
    <section className="space-y-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Dashboard
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-2">
          Bienvenido al sistema de búsqueda de datos catastrales.
        </p>
      </div>
    </section>
  );
};

export default Dashboard;