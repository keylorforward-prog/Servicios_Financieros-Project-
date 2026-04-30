'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transacciones_ventanilla', {
      id_transacciones: {
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
          key: 'id_cuenta',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      empleado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'empleados',
          key: 'id_Empleado',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      sucursal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursales',
          key: 'id_sucursal',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      monto: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false,
      },
      tipo_operacion: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'deposito, retiro, transferencia',
      },
      numero_boleta_fisica: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_transaccion: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('transacciones_ventanilla');
  },
};