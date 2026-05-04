'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      idClientes: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tipo_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      identificacion: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nombre_completo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      direccion_residencia: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      referencia_firma: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creado_el: {
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