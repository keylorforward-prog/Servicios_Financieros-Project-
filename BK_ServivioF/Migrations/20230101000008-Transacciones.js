'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transacciones_ventanilla', {
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
      empleado_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'empleados',
          key: 'idEmpleado',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      sucursal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursales',
          key: 'idSucursal',
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
      },
      numero_boleta_fisica: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      creado_el: {
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