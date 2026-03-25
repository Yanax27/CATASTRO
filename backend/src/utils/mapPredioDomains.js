const {
  TUC_DOMAIN,
  TUU_DOMAIN,
  TEP_DOMAIN,
  CEP_DOMAIN,
  TVI_DOMAIN,
  ACABADO_CALZADA_DOMAIN,
  SI_NO_AGUA_DOMAIN,
  SI_NO_ENERGIA_DOMAIN,
  SI_NO_GAS_DOMAIN,
  SI_NO_ALUMBRADO_DOMAIN,
  SI_NO_TELEFONO_DOMAIN,
  SI_NO_ALC_SANITARIO_DOMAIN,
  PENDIENTE_DOMAIN,
} = require("./predioDomains");

const getDomainValue = (domain, code) => {
  if (code === null || code === undefined) return null;
  return domain[code] || `Código no definido (${code})`;
};

const mapPredioDomains = (predio) => {
  if (!predio) return null;

  return {
    ...predio,

    tuc_nombre: getDomainValue(TUC_DOMAIN, predio.tuc_id),
    tuu_nombre: getDomainValue(TUU_DOMAIN, predio.tuu_id),
    tep_nombre: getDomainValue(TEP_DOMAIN, predio.tep_id),
    cep_nombre: getDomainValue(CEP_DOMAIN, predio.cep_id),
    tvi_nombre: getDomainValue(TVI_DOMAIN, predio.tvi_id),

    acabado_calzada_nombre: getDomainValue(
      ACABADO_CALZADA_DOMAIN,
      predio.acabado_calzada
    ),

    tsvr1_aguapotable_nombre: getDomainValue(
      SI_NO_AGUA_DOMAIN,
      predio.tsvr1_aguapotable
    ),

    tsrv2_energia_elect_nombre: getDomainValue(
      SI_NO_ENERGIA_DOMAIN,
      predio.tsrv2_energia_elect
    ),

    tsrv3_gas_domi_nombre: getDomainValue(
      SI_NO_GAS_DOMAIN,
      predio.tsrv3_gas_domi
    ),

    tsrv4_alumbrado_pub_nombre: getDomainValue(
      SI_NO_ALUMBRADO_DOMAIN,
      predio.tsrv4_alumbrado_pub
    ),

    tsrv5_telefono_nombre: getDomainValue(
      SI_NO_TELEFONO_DOMAIN,
      predio.tsrv5_telefono
    ),

    tsrv7_alcan_sanitario_nombre: getDomainValue(
      SI_NO_ALC_SANITARIO_DOMAIN,
      predio.tsrv7_alcan_sanitario
    ),

    pendiente_nombre: getDomainValue(PENDIENTE_DOMAIN, predio.pendiente),
  };
};

const mapPrediosDomains = (predios = []) => {
  return predios.map(mapPredioDomains);
};

module.exports = {
  mapPredioDomains,
  mapPrediosDomains,
};