const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Cuenta = sequelize.define('Cuenta', {
  numero_cuenta: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'idClientes',
    },
  },
  sucursal_apertura_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sucursales',
      key: 'idSucursal',
    },
  },
  tipo_cuenta_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tipos_cuenta',
      key: 'idTipoCuenta',
    },
  },
  moneda: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  saldo_actual: {
    type: DataTypes.DECIMAL(18, 2),
    defaultValue: 0,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creado_el: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'cuentas',
  timestamps: false,
});

module.exports = Cuenta;