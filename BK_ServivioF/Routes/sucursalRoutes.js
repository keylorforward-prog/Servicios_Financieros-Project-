const express = require('express');
const router = express.Router();
const SucursalController = require('../Controller/SucursalController');

/**
 * @swagger
 * tags:
 *   name: Sucursales
 *   description: Gestión de sucursales bancarias
 */

/**
 * @swagger
 * /sucursales:
 *   get:
 *     summary: Obtener todas las sucursales
 *     tags: [Sucursales]
 *     responses:
 *       200:
 *         description: Lista de sucursales
 */
router.get('/', SucursalController.getAll);

/**
 * @swagger
 * /sucursales/{id}:
 *   get:
 *     summary: Obtener una sucursal por ID
 *     tags: [Sucursales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos de la sucursal
 *       404:
 *         description: Sucursal no encontrada
 */
router.get('/:id', SucursalController.getById);

/**
 * @swagger
 * /sucursales:
 *   post:
 *     summary: Crear una nueva sucursal
 *     tags: [Sucursales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               provincia:
 *                 type: string
 *               canton:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sucursal creada
 */
router.post('/', SucursalController.create);

/**
 * @swagger
 * /sucursales/{id}:
 *   put:
 *     summary: Actualizar una sucursal
 *     tags: [Sucursales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucursal actualizada
 */
router.put('/:id', SucursalController.update);

/**
 * @swagger
 * /sucursales/{id}:
 *   delete:
 *     summary: Eliminar una sucursal
 *     tags: [Sucursales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucursal eliminada
 */
router.delete('/:id', SucursalController.delete);

module.exports = router;
