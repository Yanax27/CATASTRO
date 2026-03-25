const TUC_DOMAIN = {
  1: "Propiedad Unifamiliar",
  2: "Propiedad Horizontal",
  3: "Terreno Sin Construcción",
  4: "Propiedad en Condominio",
  5: "Calle",
  6: "Avenida",
  7: "Autopista",
  8: "Callejón",
  9: "Parque",
  10: "Plaza",
  11: "Area verde",
  12: "Deportivo",
  13: "Multifuncional",
  14: "Propiedad Horizontal (Madre)",
  15: "Propiedad en Condominio (Madre)",
  16: "Comercio y servicios terciarios",
  17: "Salud",
  18: "Educación",
  19: "Cultural",
  20: "Social",
  21: "Recreacional",
  22: "Cementerio",
  23: "Cursos y fuentes de agua",
  24: "Industria",
  25: "Depósito industrial",
  26: "Gestión pública",
  500: "Sin información",
};

const TUU_DOMAIN = {
  1: "Residencial",
  2: "Industrial",
  3: "Comercial",
  4: "Recreación",
  5: "Agricola",
  6: "Servicios Públicos",
  7: "Servicios Privados",
  200: "Otros",
};

const TEP_DOMAIN = {
  1: "Predio",
  2: "Via",
  3: "Cursos y fuentes de agua",
  4: "Equipamiento",
  5: "Espacios abiertos",
  6: "Industrial",
  500: "Sin información",
};

const CEP_DOMAIN = {
  1: "Privado",
  2: "Publico",
  500: "Sin información",
};

const TVI_DOMAIN = {
  1: "Autopista",
  2: "Avenida",
  3: "Calle",
  4: "Calle peatonal",
  5: "Callejón",
  6: "Camino",
  7: "Carretera",
  8: "Pasaje",
  9: "Puente",
  500: "Sin información",
};

const ACABADO_CALZADA_DOMAIN = {
  1: "Adoquinado",
  2: "Asfaltado",
  3: "Empedrado",
  4: "Enladrillado",
  5: "Enlosetado",
  6: "Estado natural",
  7: "Hormigonado",
  8: "Pavimento rígido",
  9: "Ripiado",
  10: "Tierra natural apisonado",
  500: "Sin información",
};

const SI_NO_AGUA_DOMAIN = {
  0: "No",
  1: "Si",
  500: "Sin información",
};

const SI_NO_ENERGIA_DOMAIN = {
  0: "No",
  2: "Si",
  500: "Sin información",
};

const SI_NO_GAS_DOMAIN = {
  0: "No",
  3: "Si",
  500: "Sin información",
};

const SI_NO_ALUMBRADO_DOMAIN = {
  0: "No",
  4: "Si",
  500: "Sin información",
};

const SI_NO_TELEFONO_DOMAIN = {
  0: "No",
  5: "Si",
  500: "Sin información",
};

const SI_NO_ALC_SANITARIO_DOMAIN = {
  0: "No",
  7: "Si",
  500: "Sin información",
};

const PENDIENTE_DOMAIN = {
  1: "Plano (>=0º y <=5º)",
  2: "Semiplano (>5º y <=10º)",
  3: "Pendiente (>10º y <=20º)",
  4: "Muy pendiente (>20º y <=40º)",
  5: "Barranco (>40º)",
  500: "Sin información",
};

module.exports = {
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
};