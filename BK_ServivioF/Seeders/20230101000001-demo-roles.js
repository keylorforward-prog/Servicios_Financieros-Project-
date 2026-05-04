'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        nombre_rol: 'Administrador',
        descripcion: 'Acceso total al sistema',
      },
      {
        nombre_rol: 'Cajero',
        descripcion: 'Realiza transacciones en ventanilla',
      },
      {
        nombre_rol: 'Gerente de Sucursal',
        descripcion: 'Supervisa las operaciones de la sucursal',
      },
      {
        nombre_rol: 'Plataforma',
        descripcion: 'Atención al cliente y apertura de cuentas',
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
