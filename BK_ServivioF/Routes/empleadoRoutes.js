const express = require('express');
const router = express.Router();
const EmpleadoController = require('../Controller/EmpleadoController');

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Gestión de personal de la entidad financiera
 */

/**
 * @swagger
 * /empleados:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados con sus sucursales y roles
 */
router.get('/', EmpleadoController.getAll);

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos detallados del empleado
 */
router.get('/:id', EmpleadoController.getById);

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Registrar un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cedula_identidad
 *               - nombre_completo
 *               - sucursal_id
 *               - rol_id
 *               - password
 *     responses:
 *       201:
 *         description: Empleado registrado exitosamente
 */
router.post('/', EmpleadoController.create);

/**
 * @swagger
 * /empleados/{id}:
 *   put:
 *     summary: Actualizar datos de un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Empleado actualizado
 */
router.put('/:id', EmpleadoController.update);

/**
 * @swagger
 * /empleados/{id}:
 *   delete:
 *     summary: Dar de baja a un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Empleado eliminado
 */
router.delete('/:id', EmpleadoController.delete);

module.exports = router;
