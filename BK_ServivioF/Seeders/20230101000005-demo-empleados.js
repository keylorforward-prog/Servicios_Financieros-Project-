'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Asumimos que las sucursales tienen IDs 1, 2, 3 y los roles tienen IDs 1, 2, 3, 4
    await queryInterface.bulkInsert('empleados', [
      {
        sucursal_id: 1, // Sucursal Central
        rol_id: 1,      // Administrador
        cedula_identidad: '1-0000-0001',
        nombre_empleado: 'Admin',
        segundo_nombre_empleado: 'Sistema',
        apellido1: 'Principal',
        apellido2: 'Raíz',
        empleado_creado_date: new Date()
      },
      {
        sucursal_id: 1, // Sucursal Central
        rol_id: 2,      // Cajero
        cedula_identidad: '1-1111-1111',
        nombre_empleado: 'Carlos',
        segundo_nombre_empleado: 'Alberto',
        apellido1: 'Mora',
        apellido2: 'Solís',
        empleado_creado_date: new Date()
      },
      {
        sucursal_id: 2, // Sucursal Escazú
        rol_id: 4,      // Plataforma
        cedula_identidad: '2-2222-2222',
        nombre_empleado: 'Ana',
        segundo_nombre_empleado: 'Lucía',
        apellido1: 'Vargas',
        apellido2: 'Castro',
        empleado_creado_date: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empleados', null, {});
  }
};
