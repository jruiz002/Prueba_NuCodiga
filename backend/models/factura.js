const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Factura = sequelize.define('Factura', {
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Factura;