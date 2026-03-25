import React from "react";

const Item = ({ label, value }) => (
  <div className="flex justify-between text-sm border-b border-slate-200 dark:border-slate-800 py-2 gap-3">
    <span className="text-slate-600 dark:text-slate-300">{label}</span>
    <span className="font-medium text-slate-800 dark:text-white text-right">
      {value ?? "-"}
    </span>
  </div>
);

const PredioCharacteristics = ({ predio }) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold mb-3 text-slate-800 dark:text-white">
        Características
      </h3>
      <Item label="Tipo de Unidad Catasral" value={predio.tuc_nombre} />
      <Item label="Uso de la uso UCA" value={predio.tuu_nombre} />
      <Item label="Tipo de espacio" value={predio.tep_nombre} />
      <Item label="Clase de espacio" value={predio.cep_nombre} />
      <Item label="Tipo de vía" value={predio.tvi_nombre} />
      <Item label="Pendiente" value={predio.pendiente_nombre} />

      <Item label="Referencia antigua" value={predio.referencia_catastral_antigua} />
      <Item label="Referencia nueva" value={predio.referencia_catastral} />
      <Item
        label="Superficie terreno"
        value={`${Number(predio.superficie_terreno).toFixed(2)} m²`}
      />
      <Item
        label="Superficie construida"
        value={`${Number(predio.superficie_construida).toFixed(2)} m²`}
      />
      <Item label="Agua potable" value={predio.tsvr1_aguapotable_nombre} />
      <Item label="Energía eléctrica" value={predio.tsrv2_energia_elect_nombre} />
      <Item label="Gas domiciliario" value={predio.tsrv3_gas_domi_nombre} />
      <Item label="Teléfono" value={predio.tsrv5_telefono_nombre} />
      <Item label="Alc. sanitario" value={predio.tsrv7_alcan_sanitario_nombre} />
      <Item label="Zona" value={predio.dir_nombre_zona} />
      <Item label="Calle" value={predio.dir_nombre_calle} />
      <Item label="Dirección" value={predio.dir_descripcion} />
    </div>
  );
};

export default PredioCharacteristics;