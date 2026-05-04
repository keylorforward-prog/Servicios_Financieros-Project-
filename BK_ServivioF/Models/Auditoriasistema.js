const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const AuditoriaSistema = sequelize.define('AuditoriaSistema', {
  id: {
    // BIGINT: Entero de gran capacidad (hasta 9 quintillones), ideal para tablas con muchos registros.
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_evento: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  empleado_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'empleados',
      key: 'idEmpleado',
    },
  },
  tabla_afectada: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registro_id: {
    type: DataTypes.STRING,
  },
  accion_realizada: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor_anterior: {
    // JSONB: Formato binario optimizado para almacenar objetos JSON. Permite búsquedas rápidas e índices.
    type: DataTypes.JSONB,
  },
  valor_nuevo: {
    // JSONB: Igual que el anterior, guarda el estado final del registro de forma eficiente.
    type: DataTypes.JSONB,
  },
  ip_terminal: {
    type: DataTypes.STRING,
  },
  detalles: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'auditoria_sistema',
  timestamps: false,
});

module.exports = AuditoriaSistema;