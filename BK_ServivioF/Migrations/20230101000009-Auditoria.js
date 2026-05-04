'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auditoria_sistema', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fecha_evento: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      empleado_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'empleados',
          key: 'idEmpleado',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      tabla_afectada: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registro_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accion_realizada: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor_anterior: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      valor_nuevo: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      ip_terminal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      detalles: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('auditoria_sistema');
  },
};