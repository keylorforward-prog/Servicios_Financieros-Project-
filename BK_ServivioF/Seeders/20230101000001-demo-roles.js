'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nombre_rol: 'Administrador',
        descripcion_rol: 'Acceso total al sistema',
      },
      {
        nombre_rol: 'Cajero',
        descripcion_rol: 'Realiza transacciones en ventanilla',
      },
      {
        nombre_rol: 'Gerente de Sucursal',
        descripcion_rol: 'Supervisa las operaciones de la sucursal',
      },
      {
        nombre_rol: 'Plataforma',
        descripcion_rol: 'Atención al cliente y apertura de cuentas',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
