const { getPool, sql } = require("../config/db");

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

  if (filters.zona) {
    query += ` AND zona = @zona`;
    request.input("zona", sql.NVarChar(2), filters.zona);
  }

  if (filters.distrito) {
    query += ` AND distrito = @distrito`;
    request.input("distrito", sql.NVarChar(2), filters.distrito);
  }

  if (filters.manzano) {
    query += ` AND manzano = @manzano`;
    request.input("manzano", sql.NVarChar(3), filters.manzano);
  }

  if (filters.predio) {
    query += ` AND predio = @predio`;
    request.input("predio", sql.NVarChar(3), filters.predio);
  }

  if (filters.referencia_catastral) {
    query += ` AND referencia_catastral LIKE @referencia_catastral`;
    request.input(
      "referencia_catastral",
      sql.NVarChar(23),
      `%${filters.referencia_catastral}%`
    );
  }

  if (filters.tuc_id) {
    query += ` AND tuc_id = @tuc_id`;
    request.input("tuc_id", sql.Int, Number(filters.tuc_id));
  }

  if (filters.tuu_id) {
    query += ` AND tuu_id = @tuu_id`;
    request.input("tuu_id", sql.Int, Number(filters.tuu_id));
  }

  if (filters.tep_id) {
    query += ` AND tep_id = @tep_id`;
    request.input("tep_id", sql.Int, Number(filters.tep_id));
  }

  if (filters.cep_id) {
    query += ` AND cep_id = @cep_id`;
    request.input("cep_id", sql.Int, Number(filters.cep_id));
  }

  if (filters.tipo_documento) {
    query += ` AND tipo_documento = @tipo_documento`;
    request.input("tipo_documento", sql.Int, Number(filters.tipo_documento));
  }

  query += ` ORDER BY zona, distrito, manzano, predio`;

  const result = await request.query(query);
  return result.recordset;
};

const getPredioByReferenciaCatastral = async (referenciaCatastral) => {
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
      porcnet_comun,
      superficie_ideal_edif_comun,
      frente,
      fondo,
      forma,
      ubi_manzana,
      dir_nombre_zona,
      dir_nombre_calle,
      dir_numero_puerta,
      dir_numero_edificio,
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
      numpers_habitaninmueble,
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
      n_inmueble
    FROM dbo.PREDIO
    WHERE referencia_catastral = @referencia_catastral
  `;

  const result = await request.query(query);
  return result.recordset[0] || null;
};

module.exports = {
  searchPredios,
  getPredioByReferenciaCatastral,
};