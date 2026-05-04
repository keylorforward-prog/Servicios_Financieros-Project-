'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('talonarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cuenta_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'cuentas',
          key: 'numero_cuenta',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      tipo_talonario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      serie_inicio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      serie_fin: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('talonarios');
  },
};