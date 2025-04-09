const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.post('/facturas', facturaController.crearFactura);
router.get('/facturas/:numero', facturaController.obtenerFactura);
router.post('/reporte', facturaController.reportePorFecha);

module.exports = router;
