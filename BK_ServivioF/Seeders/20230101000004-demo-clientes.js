'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clientes', [
      {
        tipo_id: 'Cédula Física',
        identificacion_cliente: '1-1234-5678',
        nombre_cliente: 'Juan',
        apellido1_cliente: 'Pérez',
        apellido2_cliente: 'González',
        direccion_residencia: 'San José, Montes de Oca',
        tel_cliente: '8888-1111',
        cliente_creado: new Date()
      },
      {
        tipo_id: 'Cédula Física',
        identificacion_cliente: '2-0987-0654',
        nombre_cliente: 'María',
        apellido1_cliente: 'Rodríguez',
        apellido2_cliente: 'Sánchez',
        direccion_residencia: 'Alajuela, Centro',
        tel_cliente: '7777-2222',
        cliente_creado: new Date()
      },
      {
        tipo_id: 'DIMEX',
        identificacion_cliente: '155800012345',
        nombre_cliente: 'John',
        apellido1_cliente: 'Smith',
        apellido2_cliente: null,
        direccion_residencia: 'Escazú, Guachipelín',
        tel_cliente: '6666-3333',
        cliente_creado: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};
