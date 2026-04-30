'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sucursales', {
      id_sucursal: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre_sucursal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provincia_sucursal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canton_sucursal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      direccion_fisica_sucursal: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      efectivo_en_sucursal: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      sucursal_creada: {
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