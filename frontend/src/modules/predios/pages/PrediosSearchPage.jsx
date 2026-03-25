import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchPredios,
  updatePredioFilters,
  resetPredioFilters,
  setPredioPage,
} from "../predioActions";

import PredioSearchFilters from "../components/search/PredioSearchFilters";
import PredioSearchTable from "../components/search/PredioSearchTable";
import PredioSearchCard from "../components/search/PredioSearchCard";
import PredioSearchEmpty from "../components/search/PredioSearchEmpty";

const PrediosSearchPage = () => {
  const dispatch = useDispatch();

  const {
    filters,
    paginatedPredios,
    loading,
    currentPage,
    totalItems,
    itemsPerPage,
  } = useSelector((state) => state.predios);

  const handleSearch = () => {
    dispatch(searchPredios());
  };

  const handleClear = () => {
    dispatch(resetPredioFilters());
  };

  const handleChange = (e) => {
    dispatch(
      updatePredioFilters({
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* FILTROS */}
      <PredioSearchFilters
        filters={filters}
        onChange={handleChange}
        onSearch={handleSearch}
        onClear={handleClear}
        loading={loading}
      />

      {/* RESULTADOS */}
      {!loading && paginatedPredios.length === 0 && (
        <PredioSearchEmpty />
      )}

      {/* TABLET / DESKTOP */}
      <div className="hidden md:block">
        <PredioSearchTable predios={paginatedPredios} />
      </div>

      {/* MÓVIL */}
      <div className="md:hidden space-y-4">
        {paginatedPredios.map((p) => (
          <PredioSearchCard key={p.OBJECTID} predio={p} />
        ))}
      </div>
    </div>
  );
};

export default PrediosSearchPage;