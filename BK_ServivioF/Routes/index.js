const express = require('express');
const router = express.Router();

// ── Auth (rutas públicas) ────────────────────────────
const authRoutes = require('./authRoutes');

// ── Recursos protegidos ──────────────────────────────
const sucursalRoutes    = require('./sucursalRoutes');
const rolRoutes         = require('./rolRoutes');
const empleadoRoutes    = require('./empleadoRoutes');
const clienteRoutes     = require('./clienteRoutes');
const tipoCuentaRoutes  = require('./tipoCuentaRoutes');
const cuentaRoutes      = require('./cuentaRoutes');
const talonarioRoutes   = require('./talonarioRoutes');
const transaccionRoutes = require('./transaccionRoutes');
const auditoriaRoutes   = require('./auditoriaRoutes');

// Autenticación — sin protección (login / refresh / me)
router.use('/auth', authRoutes);

// Recursos — protegidos en cada archivo de rutas
router.use('/sucursales',   sucursalRoutes);
router.use('/roles',        rolRoutes);
router.use('/empleados',    empleadoRoutes);
router.use('/clientes',     clienteRoutes);
router.use('/tipos-cuenta', tipoCuentaRoutes);
router.use('/cuentas',      cuentaRoutes);
router.use('/talonarios',   talonarioRoutes);
router.use('/transacciones',transaccionRoutes);
router.use('/auditoria',    auditoriaRoutes);

module.exports = router;
