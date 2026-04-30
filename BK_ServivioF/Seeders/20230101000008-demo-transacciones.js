'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transacciones_ventanilla', [
      {
        cuenta_id: 'CR010123456789',
        empleado_id: 2, // Cajero Carlos
        sucursal_id: 1, // Sucursal Central
        monto: 50000.00,
        tipo_operacion: 'deposito',
        numero_boleta_fisica: 'BO-1001',
        fecha_transaccion: new Date()
      },
      {
        cuenta_id: 'CR020987654321',
        empleado_id: 2, // Cajero Carlos
        sucursal_id: 1, // Sucursal Central
        monto: 100.00,
        tipo_operacion: 'retiro',
        numero_boleta_fisica: 'BO-1002',
        fecha_transaccion: new Date()
      },
      {
        cuenta_id: 'CR030555444333',
        empleado_id: 2, // Cajero Carlos
        sucursal_id: 1, // Sucursal Central
        monto: 5000.00,
        tipo_operacion: 'deposito',
        numero_boleta_fisica: 'BO-1003',
        fecha_transaccion: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transacciones_ventanilla', null, {});
  }
};
