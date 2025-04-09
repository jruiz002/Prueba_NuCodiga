const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false, // Desactivar logs SQL
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch((err) => console.error('Error de conexión:', err));

module.exports = sequelize;
