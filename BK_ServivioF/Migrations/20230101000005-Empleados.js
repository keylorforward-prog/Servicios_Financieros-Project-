'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('empleados', {
      idEmpleado: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sucursal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursales',
          key: 'idSucursal',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      rol_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'idRol',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      cedula_identidad: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nombre_completo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creado_el: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('empleados');
  },
};