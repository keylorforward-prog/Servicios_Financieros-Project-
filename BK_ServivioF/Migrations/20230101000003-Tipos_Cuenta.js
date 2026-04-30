'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tipos_cuenta', {
      id_tipoCuenta: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre_cuenta: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      descripcion_cuenta: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      permite_cheques_cuenta: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tipos_cuenta');
  },
};