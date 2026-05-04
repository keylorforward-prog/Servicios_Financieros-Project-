const express = require('express');
const router = express.Router();
const CuentaController = require('../Controller/CuentaController');

/**
 * @swagger
 * tags:
 *   name: Cuentas
 *   description: Gestión de cuentas bancarias de clientes
 */

/**
 * @swagger
 * /cuentas:
 *   get:
 *     summary: Listar todas las cuentas
 *     tags: [Cuentas]
 *     responses:
 *       200:
 *         description: Lista de cuentas con su cliente y sucursal
 */
router.get('/', CuentaController.getAll);

/**
 * @swagger
 * /cuentas/{id}:
 *   get:
 *     summary: Obtener una cuenta por su número de cuenta
 *     tags: [Cuentas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de la cuenta
 */
router.get('/:id', CuentaController.getById);

/**
 * @swagger
 * /cuentas:
 *   post:
 *     summary: Aperturar una nueva cuenta
 *     tags: [Cuentas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero_cuenta
 *               - cliente_id
 *               - sucursal_apertura_id
 *               - tipo_cuenta_id
 *               - moneda
 *               - estado
 *     responses:
 *       201:
 *         description: Cuenta aperturada exitosamente
 */
router.post('/', CuentaController.create);

/**
 * @swagger
 * /cuentas/{id}:
 *   put:
 *     summary: Actualizar estado o datos de cuenta
 *     tags: [Cuentas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Cuenta actualizada
 */
router.put('/:id', CuentaController.update);

/**
 * @swagger
 * /cuentas/{id}:
 *   delete:
 *     summary: Cerrar/Eliminar cuenta
 *     tags: [Cuentas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Cuenta eliminada
 */
router.delete('/:id', CuentaController.delete);

module.exports = router;
