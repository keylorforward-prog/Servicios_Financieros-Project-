const express = require('express');
const router = express.Router();
const TalonarioController = require('../Controller/TalonarioController');

/**
 * @swagger
 * tags:
 *   name: Talonarios
 *   description: Gestión de talonarios de cheques para cuentas
 */

/**
 * @swagger
 * /talonarios:
 *   get:
 *     summary: Obtener todos los talonarios
 *     tags: [Talonarios]
 *     responses:
 *       200:
 *         description: Lista de talonarios
 */
router.get('/', TalonarioController.getAll);

/**
 * @swagger
 * /talonarios/{id}:
 *   get:
 *     summary: Obtener un talonario por ID
 *     tags: [Talonarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del talonario
 */
router.get('/:id', TalonarioController.getById);

/**
 * @swagger
 * /talonarios:
 *   post:
 *     summary: Registrar un nuevo talonario
 *     tags: [Talonarios]
 *     responses:
 *       201:
 *         description: Talonario creado
 */
router.post('/', TalonarioController.create);

/**
 * @swagger
 * /talonarios/{id}:
 *   put:
 *     summary: Actualizar talonario
 *     tags: [Talonarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Actualizado
 */
router.put('/:id', TalonarioController.update);

/**
 * @swagger
 * /talonarios/{id}:
 *   delete:
 *     summary: Eliminar talonario
 *     tags: [Talonarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Eliminado
 */
router.delete('/:id', TalonarioController.delete);

module.exports = router;
