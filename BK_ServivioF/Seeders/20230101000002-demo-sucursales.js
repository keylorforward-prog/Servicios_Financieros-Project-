'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sucursales', [
      {
        nombre_sucursal: 'Sucursal Central',
        provincia_sucursal: 'San José',
        canton_sucursal: 'San José',
        direccion_fisica_sucursal: 'Avenida Central, Calle 1',
        efectivo_en_sucursal: 50000000.00,
        sucursal_creada: new Date()
      },
      {
        nombre_sucursal: 'Sucursal Escazú',
        provincia_sucursal: 'San José',
        canton_sucursal: 'Escazú',
        direccion_fisica_sucursal: 'Multiplaza Escazú, local 45',
        efectivo_en_sucursal: 25000000.00,
        sucursal_creada: new Date()
      },
      {
        nombre_sucursal: 'Sucursal Alajuela',
        provincia_sucursal: 'Alajuela',
        canton_sucursal: 'Alajuela',
        direccion_fisica_sucursal: 'Costado Norte del Parque Central',
        efectivo_en_sucursal: 15000000.00,
        sucursal_creada: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sucursales', null, {});
  }
};
