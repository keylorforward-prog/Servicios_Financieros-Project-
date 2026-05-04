const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const TransaccionVentanilla = sequelize.define('TransaccionVentanilla', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cuenta_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'cuentas',
      key: 'numero_cuenta',
    },
  },
  empleado_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empleados',
      key: 'idEmpleado',
    },
  },
  sucursal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sucursales',
      key: 'idSucursal',
    },
  },
  monto: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false,
  },
  tipo_operacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero_boleta_fisica: {
    type: DataTypes.STRING,
  },
  creado_el: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'transacciones_ventanilla',
  timestamps: false,
});

module.exports = TransaccionVentanilla;