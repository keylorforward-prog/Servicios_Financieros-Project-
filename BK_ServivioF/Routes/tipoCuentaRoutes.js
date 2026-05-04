const express = require('express');
const router = express.Router();
const TipoCuentaController = require('../Controller/TipoCuentaController');

/**
 * @swagger
 * tags:
 *   name: Tipos de Cuenta
 *   description: Tipos de cuenta bancaria (Ahorros, Corriente, etc.)
 */

/**
 * @swagger
 * /tipos-cuenta:
 *   get:
 *     summary: Listar todos los tipos de cuenta
 *     tags: [Tipos de Cuenta]
 *     responses:
 *       200:
 *         description: Lista de tipos de cuenta
 */
router.get('/', TipoCuentaController.getAll);

/**
 * @swagger
 * /tipos-cuenta/{id}:
 *   get:
 *     summary: Obtener un tipo de cuenta por ID
 *     tags: [Tipos de Cuenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del tipo de cuenta
 */
router.get('/:id', TipoCuentaController.getById);

/**
 * @swagger
 * /tipos-cuenta:
 *   post:
 *     summary: Crear un nuevo tipo de cuenta
 *     tags: [Tipos de Cuenta]
 *     responses:
 *       201:
 *         description: Tipo de cuenta creado
 */
router.post('/', TipoCuentaController.create);

/**
 * @swagger
 * /tipos-cuenta/{id}:
 *   put:
 *     summary: Actualizar tipo de cuenta
 *     tags: [Tipos de Cuenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Actualizado
 */
router.put('/:id', TipoCuentaController.update);

/**
 * @swagger
 * /tipos-cuenta/{id}:
 *   delete:
 *     summary: Eliminar tipo de cuenta
 *     tags: [Tipos de Cuenta]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Eliminado
 */
router.delete('/:id', TipoCuentaController.delete);

module.exports = router;
