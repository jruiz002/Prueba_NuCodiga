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
  },
  total: {
    type: DataTypes.VIRTUAL,
    get() {
      let total = 0;
      if (this.DetalleFacturas) {
        this.DetalleFacturas.forEach(detalle => {
          total += detalle.cantidad * detalle.precio;
        });
      }
      return total;
    }
  }
});

module.exports = Factura;
