// models/detalleFactura.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Factura = require('./factura');

const DetalleFactura = sequelize.define('DetalleFactura', {
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  facturaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Factura,
      key: 'id'
    }
  }
});

// Relación: una Factura tiene muchos Detalles
Factura.hasMany(DetalleFactura, { foreignKey: 'facturaId' });
DetalleFactura.belongsTo(Factura, { foreignKey: 'facturaId' });

module.exports = DetalleFactura;
