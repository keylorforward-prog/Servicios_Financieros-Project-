'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipos_cuenta', [
      {
        nombre_cuenta: 'Cuenta de Ahorros',
        descripcion_cuenta: 'Cuenta estándar para ahorros con intereses bajos',
        permite_cheques_cuenta: false
      },
      {
        nombre_cuenta: 'Cuenta Corriente',
        descripcion_cuenta: 'Cuenta para uso diario con chequera',
        permite_cheques_cuenta: true
      },
      {
        nombre_cuenta: 'Cuenta Juvenil',
        descripcion_cuenta: 'Para menores de edad, sin cargos por manejo',
        permite_cheques_cuenta: false
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos_cuenta', null, {});
  }
};
