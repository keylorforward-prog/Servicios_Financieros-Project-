const express = require('express');
const router = express.Router();
const TransaccionVentanillaController = require('../Controller/TransaccionVentanillaController');

/**
 * @swagger
 * tags:
 *   name: Transacciones
 *   description: Registro de movimientos en ventanilla (Depósitos, Retiros)
 */

/**
 * @swagger
 * /transacciones:
 *   get:
 *     summary: Listar todas las transacciones
 *     tags: [Transacciones]
 *     responses:
 *       200:
 *         description: Historial de transacciones
 */
router.get('/', TransaccionVentanillaController.getAll);

/**
 * @swagger
 * /transacciones/{id}:
 *   get:
 *     summary: Obtener detalle de una transacción
 *     tags: [Transacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la transacción
 */
router.get('/:id', TransaccionVentanillaController.getById);

/**
 * @swagger
 * /transacciones:
 *   post:
 *     summary: Registrar una nueva transacción en ventanilla
 *     tags: [Transacciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cuenta_id
 *               - empleado_id
 *               - sucursal_id
 *               - monto
 *               - tipo_operacion
 *     responses:
 *       201:
 *         description: Transacción registrada
 */
router.post('/', TransaccionVentanillaController.create);

/**
 * @swagger
 * /transacciones/{id}:
 *   put:
 *     summary: Actualizar datos de transacción (solo admin)
 *     tags: [Transacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Actualizada
 */
router.put('/:id', TransaccionVentanillaController.update);

/**
 * @swagger
 * /transacciones/{id}:
 *   delete:
 *     summary: Anular transacción
 *     tags: [Transacciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Transacción anulada/eliminada
 */
router.delete('/:id', TransaccionVentanillaController.delete);

module.exports = router;
