const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Sucursal = sequelize.define('Sucursal', {
  idSucursal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  provincia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  canton: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion_fisica: {
    type: DataTypes.TEXT,
  },
  efectivo_en_boveda: {
    type: DataTypes.DECIMAL(18, 2),
    defaultValue: 0,
  },
  creado_el: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'sucursales',
  timestamps: false,
});

module.exports = Sucursal;