'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await queryInterface.bulkInsert('clientes', [
      {
        tipo_id: 'Cédula Física',
        identificacion: '1-1234-5678',
        nombre_completo: 'Juan Pérez González',
        direccion_residencia: 'San José, Montes de Oca',
        telefono: '8888-1111',
        password: hashedPassword,
        creado_el: new Date()
      },
      {
        tipo_id: 'Cédula Física',
        identificacion: '2-0987-0654',
        nombre_completo: 'María Rodríguez Sánchez',
        direccion_residencia: 'Alajuela, Centro',
        telefono: '7777-2222',
        password: hashedPassword,
        creado_el: new Date()
      },
      {
        tipo_id: 'DIMEX',
        identificacion: '155800012345',
        nombre_completo: 'John Smith',
        direccion_residencia: 'Escazú, Guachipelín',
        telefono: '6666-3333',
        password: hashedPassword,
        creado_el: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clientes', null, {});
  }
};
