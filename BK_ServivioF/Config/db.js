const { Sequelize } = require('sequelize');
require('dotenv').config();

// Las migraciones hacen las tablas en la DB

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql', // Ajusta esto si usas postgres, mariadb, etc.
    logging: false, // Cambia a console.log si deseas ver las consultas SQL generadas
  }
);

module.exports = sequelize;
