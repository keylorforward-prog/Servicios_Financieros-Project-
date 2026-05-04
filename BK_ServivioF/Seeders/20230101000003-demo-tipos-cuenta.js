'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipos_cuenta', [
      {
        nombre: 'Cuenta de Ahorros',
        descripcion: 'Cuenta estándar para ahorros con intereses bajos',
        permite_cheques: false
      },
      {
        nombre: 'Cuenta Corriente',
        descripcion: 'Cuenta para uso diario con chequera',
        permite_cheques: true
      },
      {
        nombre: 'Cuenta Juvenil',
        descripcion: 'Para menores de edad, sin cargos por manejo',
        permite_cheques: false
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipos_cuenta', null, {});
  }
};
