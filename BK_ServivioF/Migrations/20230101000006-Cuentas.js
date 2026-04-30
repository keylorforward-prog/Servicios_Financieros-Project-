'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cuentas', {
      id_cuenta: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id_clientes',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      sucursal_apertura_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursales',
          key: 'id_sucursal',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      tipo_cuenta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipos_cuenta',
          key: 'id_tipoCuenta',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      moneda_cuenta: {
        type: Sequelize.STRING(3),
        allowNull: false,
        comment: 'ISO 4217: CRC, USD',
      },
      saldo_actual: {
        type: Sequelize.DECIMAL(18, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      estado_cuenta: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'activa',
        comment: 'activa, inactiva, bloqueada, cerrada',
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