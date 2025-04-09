const Factura = require('../models/factura');
const DetalleFactura = require('../models/detalleFactura');

exports.crearFactura = async (req, res) => {
  try {
    const { numero, fecha, cliente, detalles } = req.body;
    const factura = await Factura.create({ numero, fecha, cliente });
    for (const detalle of detalles) {
      await DetalleFactura.create({ ...detalle, facturaId: factura.id });
    }
    const facturaConDetalles = await Factura.findOne({
      where: { id: factura.id },
      include: DetalleFactura
    });

    res.status(201).json({
      message: 'Factura creada',
      factura: facturaConDetalles
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerFactura = async (req, res) => {
  try {
    const factura = await Factura.findOne({
      where: { numero: req.params.numero },
      include: DetalleFactura,
    });
    if (!factura) return res.status(404).json({ error: 'Factura no encontrada' });
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.reportePorFecha = async (req, res) => {
  try {
    const { inicio, fin } = req.body;
    const facturas = await Factura.findAll({
      where: {
        fecha: {
          [require('sequelize').Op.between]: [new Date(inicio), new Date(fin)],
        },
      },
      include: DetalleFactura,
    });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
