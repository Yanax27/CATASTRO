const { getPool, sql } = require("../config/db");
const wellknown = require("wellknown");
const { reprojectGeoJSON } = require("../utils/geojson");

const searchPredios = async (filters) => {
  const pool = await getPool();
  const request = pool.request();

  let query = `
    SELECT TOP 100
      OBJECTID,
      zona,
      distrito,
      manzano,
      predio,
      referencia_catastral_antigua,
      referencia_catastral,
      referencia_catastral_padre,
      tuc_id,
      tuu_id,
      tep_id,
      cep_id,
      superficie_terreno,
      superficie_ideal_terreno,
      superficie_ocupada,
      superficie_construida,
      frente,
      fondo,
      dir_nombre_zona,
      dir_nombre_calle,
      dir_numero_puerta,
      dir_numero_edificio,
      tsvr1_aguapotable,
      tsrv2_energia_elect,
      tsrv3_gas_domi,
      tsrv5_telefono,
      tsrv7_alcan_sanitario,
      tipo_documento,
      n_matricula,
      nombre_pp,
      registro_DDRR,
      n_inmueble,
      descripcion,
      observaciones,
      fecha_levantamiento,
      ubic_carpeta,
      fecha_rec_carpeta
    FROM dbo.PREDIO
    WHERE 1 = 1
  `;

  if (filters.referencia_catastral) {
    query += ` AND referencia_catastral_antigua LIKE @referencia_catastral`;
    request.input(
      "referencia_catastral",
      sql.NVarChar(23),
      `%${filters.referencia_catastral.trim()}%`
    );
  }

  if (filters.nombre_titular) {
    query += ` AND nombre_pp LIKE @nombre_pp`;
    request.input(
      "nombre_pp",
      sql.NVarChar(225),
      `%${filters.nombre_titular.trim()}%`
    );
  }

  query += ` ORDER BY referencia_catastral_antigua ASC`;

  const result = await request.query(query);
  return result.recordset;
};

const getPredioByReferenciaCatastralAntigua = async (referenciaCatastral) => {
  const pool = await getPool();
  const request = pool.request();

  request.input(
    "referencia_catastral",
    sql.NVarChar(23),
    referenciaCatastral
  );

  const query = `
    SELECT TOP 1
      OBJECTID,
      zona,
      distrito,
      manzano,
      predio,
      referencia_catastral_antigua,
      referencia_catastral,
      referencia_catastral_padre,
      tuc_id,
      tuu_id,
      tep_id,
      cep_id,
      superficie_terreno,
      superficie_ideal_terreno,
      superficie_ocupada,
      superficie_construida,
      frente,
      fondo,
      forma,
      ubi_manzana,
      dir_nombre_zona,
      dir_nombre_calle,
      dir_numero_puerta,
      dir_numero_edificio,
      dir_descripcion,
      pendiente,
      cantidad_frentes,
      acabado_acera,
      est_levantpredio,
      tvi_id,
      acabado_calzada,
      accesibilidad_via,
      tsvr1_aguapotable,
      tsrv2_energia_elect,
      tsrv3_gas_domi,
      tsrv4_alumbrado_pub,
      tsrv5_telefono,
      tsrv6_alcan_pluvial,
      tsrv7_alcan_sanitario,
      tsrv8_transp_pub,
      tsrv9_recojo_basura,
      acabcursosdeagua,
      nombre_esp_abierto,
      preciom2_propiedad,
      fecha_levantamiento,
      superficie_mejora,
      descripcion,
      observaciones,
      ddrr,
      tipo_documento,
      n_matricula,
      nombre_pp,
      registro_DDRR,
      ruat,
      n_inmueble,
      ubic_carpeta,
      fecha_rec_carpeta,
      SHAPE.STAsText() AS shape_wkt,
      SHAPE.STSrid AS shape_srid
    FROM dbo.PREDIO
    WHERE referencia_catastral_antigua = @referencia_catastral
  `;

  const result = await request.query(query);
  const record = result.recordset[0] || null;

  if (!record) return null;

  let shape_geojson = null;

  if (record.shape_wkt) {
    try {
      const parsed = wellknown.parse(record.shape_wkt);

      if (parsed) {
        shape_geojson = reprojectGeoJSON(parsed);
      }
    } catch (error) {
      console.error("❌ Error al convertir SHAPE WKT a GeoJSON:", error);
    }
  }

  return {
    ...record,
    shape_geojson,
  };
};

const updateUbicCarpetaByReferenciaCatastralAntigua = async (
  referenciaCatastral,
  ubicCarpeta
) => {
  const pool = await getPool();
  const request = pool.request();

  request.input("referencia_catastral", sql.NVarChar(23), referenciaCatastral);
  request.input("ubic_carpeta", sql.NVarChar(100), ubicCarpeta.trim());

  const query = `
    UPDATE dbo.PREDIO
    SET
      ubic_carpeta = @ubic_carpeta,
      fecha_rec_carpeta = SYSDATETIME()
    OUTPUT
      INSERTED.OBJECTID,
      INSERTED.referencia_catastral_antigua,
      INSERTED.ubic_carpeta,
      INSERTED.fecha_rec_carpeta
    WHERE referencia_catastral_antigua = @referencia_catastral
  `;

  const result = await request.query(query);
  return result.recordset[0] || null;
};

const getDashboardResumen = async () => {
  const pool = await getPool();
  const request = pool.request();

  const query = `
    SELECT
      COUNT(*) AS totalPredios,
      SUM(CASE WHEN ubic_carpeta IS NULL OR LTRIM(RTRIM(ubic_carpeta)) = '' THEN 1 ELSE 0 END) AS sinUbicacion,
      SUM(CASE WHEN CAST(fecha_rec_carpeta AS DATE) = CAST(GETDATE() AS DATE) THEN 1 ELSE 0 END) AS actualizadosHoy,
      SUM(CASE WHEN fecha_rec_carpeta >= DATEADD(DAY, -7, GETDATE()) THEN 1 ELSE 0 END) AS actualizadosUltimos7Dias,

      SUM(CASE WHEN ubic_carpeta = 'Ventanilla' THEN 1 ELSE 0 END) AS Ventanilla,
      SUM(CASE WHEN ubic_carpeta = 'Geomatica' THEN 1 ELSE 0 END) AS Geomatica,
      SUM(CASE WHEN ubic_carpeta = 'Unidad Campo' THEN 1 ELSE 0 END) AS [Unidad Campo],
      SUM(CASE WHEN ubic_carpeta = 'Secretaria' THEN 1 ELSE 0 END) AS Secretaria,
      SUM(CASE WHEN ubic_carpeta = 'Asesoria Legal' THEN 1 ELSE 0 END) AS [Asesoria Legal],
      SUM(CASE WHEN ubic_carpeta = 'Archivos' THEN 1 ELSE 0 END) AS Archivos,
      SUM(CASE WHEN ubic_carpeta = 'Otros' THEN 1 ELSE 0 END) AS Otros
    FROM dbo.PREDIO
  `;

  const result = await request.query(query);
  const row = result.recordset[0] || {};

  return {
    totalPredios: Number(row.totalPredios || 0),
    sinUbicacion: Number(row.sinUbicacion || 0),
    actualizadosHoy: Number(row.actualizadosHoy || 0),
    actualizadosUltimos7Dias: Number(row.actualizadosUltimos7Dias || 0),
    ubicaciones: {
      Ventanilla: Number(row.Ventanilla || 0),
      Geomatica: Number(row.Geomatica || 0),
      "Unidad Campo": Number(row["Unidad Campo"] || 0),
      Secretaria: Number(row.Secretaria || 0),
      "Asesoria Legal": Number(row["Asesoria Legal"] || 0),
      Archivos: Number(row.Archivos || 0),
      Otros: Number(row.Otros || 0),
    },
  };
};

module.exports = {
  searchPredios,
  getPredioByReferenciaCatastralAntigua,
  updateUbicCarpetaByReferenciaCatastralAntigua,
  getDashboardResumen,
};