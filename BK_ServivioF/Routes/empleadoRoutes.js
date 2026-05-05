const express           = require('express');
const router            = express.Router();
const EmpleadoController = require('../Controller/EmpleadoController');
const { verifyToken }   = require('../Middleware/authMiddleware');
const { authorizeRoles }= require('../Middleware/roleMiddleware');

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
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados con sus sucursales y roles
 *       401:
 *         description: Token ausente o inválido
 */
router.get('/', verifyToken, EmpleadoController.getAll);

/**
 * @swagger
 * /empleados/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos detallados del empleado
 *       401:
 *         description: Token ausente o inválido
 *       404:
 *         description: Empleado no encontrado
 */
router.get('/:id', verifyToken, EmpleadoController.getById);

/**
 * @swagger
 * /empleados:
 *   post:
 *     summary: Registrar un nuevo empleado
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     description: Solo los **Administradores** pueden crear empleados.
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
 *             properties:
 *               cedula_identidad: { type: string }
 *               nombre_completo:  { type: string }
 *               sucursal_id:      { type: integer }
 *               rol_id:           { type: integer }
 *               password:         { type: string, format: password }
 *     responses:
 *       201:
 *         description: Empleado registrado exitosamente
 *       401:
 *         description: Token ausente o inválido
 *       403:
 *         description: Rol insuficiente (se requiere Administrador)
 */
router.post('/', verifyToken, authorizeRoles('Administrador'), EmpleadoController.create);

/**
 * @swagger
 * /empleados/{id}:
 *   put:
 *     summary: Actualizar datos de un empleado
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     description: Solo los **Administradores** pueden actualizar empleados.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *       401:
 *         description: Token ausente o inválido
 *       403:
 *         description: Rol insuficiente
 */
router.put('/:id', verifyToken, authorizeRoles('Administrador'), EmpleadoController.update);

/**
 * @swagger
 * /empleados/{id}:
 *   delete:
 *     summary: Dar de baja a un empleado
 *     tags: [Empleados]
 *     security:
 *       - BearerAuth: []
 *     description: Solo los **Administradores** pueden eliminar empleados.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empleado eliminado
 *       401:
 *         description: Token ausente o inválido
 *       403:
 *         description: Rol insuficiente
 */
router.delete('/:id', verifyToken, authorizeRoles('Administrador'), EmpleadoController.delete);

module.exports = router;

