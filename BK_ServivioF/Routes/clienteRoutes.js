const express = require('express');
const router = express.Router();
const ClienteController = require('../Controller/ClienteController');

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gestión de clientes de la entidad
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes registrados
 */
router.get('/', ClienteController.getAll);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos del cliente
 */
router.get('/:id', ClienteController.getById);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo_id
 *               - identificacion
 *               - nombre_completo
 *               - password
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 */
router.post('/', ClienteController.create);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Actualizar datos de un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Cliente actualizado
 */
router.put('/:id', ClienteController.update);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Cliente eliminado
 */
router.delete('/:id', ClienteController.delete);

module.exports = router;
