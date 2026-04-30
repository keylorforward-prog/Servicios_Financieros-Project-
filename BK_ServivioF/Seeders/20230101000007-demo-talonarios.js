'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('talonarios', [
      {
        cuenta_id: 'CR010123456789',
        tipo_talonario: 'cheques',
        serie_inicio: 1,
        serie_fin: 50,
        creado_el: new Date()
      },
      {
        cuenta_id: 'CR020987654321',
        tipo_talonario: 'retiros',
        serie_inicio: 101,
        serie_fin: 200,
        creado_el: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('talonarios', null, {});
  }
};
