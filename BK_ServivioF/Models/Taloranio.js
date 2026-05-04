const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Talonario = sequelize.define('Talonario', {
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
  tipo_talonario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serie_inicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  serie_fin: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  creado_el: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'talonarios',
  timestamps: false,
});

module.exports = Talonario;