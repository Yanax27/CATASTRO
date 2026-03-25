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
      fecha_levantamiento
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

module.exports = {
  searchPredios,
  getPredioByReferenciaCatastralAntigua,
};