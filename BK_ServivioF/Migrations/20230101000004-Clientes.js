'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      id_clientes: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tipo_id: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Ej: cedula, pasaporte, DIMEX',
      },
      identificacion_cliente: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nombre_cliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellido1_cliente: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellido2_cliente: {
        type: Sequelize.STRING,
        allowNull: true, // Segundo apellido opcional
      },
      direccion_residencia: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tel_cliente: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      referencia_firma: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: 'Ruta o referencia al archivo de firma',
      },
      cliente_creado: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('clientes');
  },
};