'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Asumimos clientes 1, 2, 3, sucursales 1, 2, 3 y tipos_cuenta 1, 2, 3
    await queryInterface.bulkInsert('cuentas', [
      {
        numero_cuenta: 'CR010123456789',
        cliente_id: 1,
        sucursal_apertura_id: 1,
        tipo_cuenta_id: 1, // Ahorros
        moneda: 'CRC',
        saldo_actual: 500000.00,
        estado: 'activa',
        creado_el: new Date()
      },
      {
        numero_cuenta: 'CR020987654321',
        cliente_id: 2,
        sucursal_apertura_id: 2,
        tipo_cuenta_id: 2, // Corriente
        moneda: 'USD',
        saldo_actual: 1500.00,
        estado: 'activa',
        creado_el: new Date()
      },
      {
        numero_cuenta: 'CR030555444333',
        cliente_id: 3,
        sucursal_apertura_id: 1,
        tipo_cuenta_id: 1, // Ahorros
        moneda: 'CRC',
        saldo_actual: 10000.00,
        estado: 'activa',
        creado_el: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cuentas', null, {});
  }
};
