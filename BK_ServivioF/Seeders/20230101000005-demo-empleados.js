'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Asumimos que las sucursales tienen IDs 1, 2, 3 y los roles tienen IDs 1, 2, 3, 4
    await queryInterface.bulkInsert('empleados', [
      {
        sucursal_id: 1, // Sucursal Central
        rol_id: 1,      // Administrador
        cedula_identidad: '1-0000-0001',
        nombre_completo: 'Admin Sistema Principal Raíz',
        password: hashedPassword,
        creado_el: new Date()
      },
      {
        sucursal_id: 1, // Sucursal Central
        rol_id: 2,      // Cajero
        cedula_identidad: '1-1111-1111',
        nombre_completo: 'Carlos Alberto Mora Solís',
        password: hashedPassword,
        creado_el: new Date()
      },
      {
        sucursal_id: 2, // Sucursal Escazú
        rol_id: 4,      // Plataforma
        cedula_identidad: '2-2222-2222',
        nombre_completo: 'Ana Lucía Vargas Castro',
        password: hashedPassword,
        creado_el: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empleados', null, {});
  }
};
