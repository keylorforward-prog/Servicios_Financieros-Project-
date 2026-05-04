'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('auditoria_sistema', [
      {
        fecha_evento: new Date(),
        empleado_id: 1, // Admin
        tabla_afectada: 'cuentas',
        registro_id: 'CR010123456789',
        accion_realizada: 'INSERT',
        valor_anterior: null,
        valor_nuevo: JSON.stringify({ saldo: 500000.00, moneda: 'CRC' }),
        ip_terminal: '192.168.1.10',
        detalles: 'Apertura de cuenta inicial'
      },
      {
        fecha_evento: new Date(),
        empleado_id: 2, // Carlos
        tabla_afectada: 'transacciones_ventanilla',
        registro_id: '1',
        accion_realizada: 'INSERT',
        valor_anterior: null,
        valor_nuevo: JSON.stringify({ monto: 50000.00, tipo: 'deposito' }),
        ip_terminal: '192.168.1.15',
        detalles: 'Depósito en efectivo realizado por cajero'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('auditoria_sistema', null, {});
  }
};
