'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('empleados', {
      id_Empleado: {
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
          key: 'id_sucursal',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      rol_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id_rol',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      cedula_identidad: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      nombre_empleado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      segundo_nombre_empleado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellido1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellido2: {
        type: Sequelize.STRING,
        allowNull: true,  // Segundo apellido opcional
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      empleado_creado_date: {
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