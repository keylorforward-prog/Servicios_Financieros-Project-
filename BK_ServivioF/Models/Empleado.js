const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const bcrypt = require('bcryptjs');

const Empleado = sequelize.define('Empleado', {
  idEmpleado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idEmpleado',
  },
  sucursal_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sucursales',
      key: 'idSucursal',
    },
  },
  rol_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'idRol',
    },
  },
  cedula_identidad: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creado_el: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'empleados',
  timestamps: false,
  hooks: {
    beforeCreate: async (empleado) => {
      if (empleado.password) {
        const salt = await bcrypt.genSalt(10);
        empleado.password = await bcrypt.hash(empleado.password, salt);
      }
    },
    beforeUpdate: async (empleado) => {
      if (empleado.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        empleado.password = await bcrypt.hash(empleado.password, salt);
      }
    },
  },
});

// Método para verificar la contraseña
Empleado.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Ocultar la contraseña en las respuestas JSON
Empleado.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = Empleado;