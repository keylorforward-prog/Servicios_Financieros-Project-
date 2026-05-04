const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');

const Rol = sequelize.define('Rol', {
  idRol: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'roles',
  timestamps: false,
});

module.exports = Rol;