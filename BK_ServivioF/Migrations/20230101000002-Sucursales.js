'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sucursales', {
      idSucursal: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provincia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canton: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      direccion_fisica: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      efectivo_en_boveda: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      creado_el: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sucursales');
  },
};