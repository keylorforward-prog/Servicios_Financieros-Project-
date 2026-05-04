const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const TipoCuenta = sequelize.define('TipoCuenta', {
  idTipoCuenta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idTipoCuenta',
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  permite_cheques: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'tipos_cuenta',
  timestamps: false,
});

module.exports = TipoCuenta;