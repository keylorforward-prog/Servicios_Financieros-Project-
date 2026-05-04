const { DataTypes } = require('sequelize');
const sequelize = require('../Config/db');
const bcrypt = require('bcryptjs');

const Cliente = sequelize.define('Cliente', {
  idClientes: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idClientes',
  },
  tipo_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  identificacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion_residencia: {
    type: DataTypes.TEXT,
  },
  telefono: {
    type: DataTypes.STRING,
  },
  referencia_firma: {
    type: DataTypes.STRING,
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
  tableName: 'clientes',
  timestamps: false,
  hooks: {
    beforeCreate: async (cliente) => {
      if (cliente.password) {
        const salt = await bcrypt.genSalt(10);
        cliente.password = await bcrypt.hash(cliente.password, salt);
      }
    },
    beforeUpdate: async (cliente) => {
      if (cliente.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        cliente.password = await bcrypt.hash(cliente.password, salt);
      }
    },
  },
});

// Método para verificar la contraseña
Cliente.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Ocultar la contraseña en las respuestas JSON
Cliente.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = Cliente;