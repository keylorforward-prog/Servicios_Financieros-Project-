const express = require('express');
const router = express.Router();

const sucursalRoutes = require('./sucursalRoutes');
const rolRoutes = require('./rolRoutes');
const empleadoRoutes = require('./empleadoRoutes');
const clienteRoutes = require('./clienteRoutes');
const tipoCuentaRoutes = require('./tipoCuentaRoutes');
const cuentaRoutes = require('./cuentaRoutes');
const talonarioRoutes = require('./talonarioRoutes');
const transaccionRoutes = require('./transaccionRoutes');
const auditoriaRoutes = require('./auditoriaRoutes');

router.use('/sucursales', sucursalRoutes);
router.use('/roles', rolRoutes);
router.use('/empleados', empleadoRoutes);
router.use('/clientes', clienteRoutes);
router.use('/tipos-cuenta', tipoCuentaRoutes);
router.use('/cuentas', cuentaRoutes);
router.use('/talonarios', talonarioRoutes);
router.use('/transacciones', transaccionRoutes);
router.use('/auditoria', auditoriaRoutes);

module.exports = router;
