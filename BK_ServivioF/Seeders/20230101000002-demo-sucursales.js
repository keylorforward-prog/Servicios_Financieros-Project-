'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sucursales', [
      {
        nombre: 'Sucursal Central',
        provincia: 'San José',
        canton: 'San José',
        direccion_fisica: 'Avenida Central, Calle 1',
        efectivo_en_boveda: 50000000.00,
        creado_el: new Date()
      },
      {
        nombre: 'Sucursal Escazú',
        provincia: 'San José',
        canton: 'Escazú',
        direccion_fisica: 'Multiplaza Escazú, local 45',
        efectivo_en_boveda: 25000000.00,
        creado_el: new Date()
      },
      {
        nombre: 'Sucursal Alajuela',
        provincia: 'Alajuela',
        canton: 'Alajuela',
        direccion_fisica: 'Costado Norte del Parque Central',
        efectivo_en_boveda: 15000000.00,
        creado_el: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sucursales', null, {});
  }
};
