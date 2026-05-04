'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cuentas', {
      numero_cuenta: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'idClientes',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      sucursal_apertura_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursales',
          key: 'idSucursal',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      tipo_cuenta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipos_cuenta',
          key: 'idTipoCuenta',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      moneda: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      saldo_actual: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'activa',
      },
      creado_el: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('cuentas');
  },
};