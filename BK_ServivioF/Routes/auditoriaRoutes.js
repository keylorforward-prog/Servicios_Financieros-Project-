const express = require('express');
const router = express.Router();
const AuditoriaSistemaController = require('../Controller/AuditoriaSistemaController');

/**
 * @swagger
 * tags:
 *   name: Auditoría
 *   description: Registro de eventos y cambios en el sistema
 */

/**
 * @swagger
 * /auditoria:
 *   get:
 *     summary: Obtener el log de auditoría completo
 *     tags: [Audoría]
 *     responses:
 *       200:
 *         description: Lista de eventos de auditoría
 */
router.get('/', AuditoriaSistemaController.getAll);

/**
 * @swagger
 * /auditoria/{id}:
 *   get:
 *     summary: Obtener un evento de auditoría específico
 *     tags: [Audoría]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle del evento
 */
router.get('/:id', AuditoriaSistemaController.getById);

/**
 * @swagger
 * /auditoria:
 *   post:
 *     summary: Crear un registro manual de auditoría
 *     tags: [Audoría]
 *     responses:
 *       201:
 *         description: Registro creado
 */
router.post('/', AuditoriaSistemaController.create);

/**
 * @swagger
 * /auditoria/{id}:
 *   put:
 *     summary: Actualizar registro de auditoría
 *     tags: [Audoría]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Actualizado
 */
router.put('/:id', AuditoriaSistemaController.update);

/**
 * @swagger
 * /auditoria/{id}:
 *   delete:
 *     summary: Eliminar registro de auditoría
 *     tags: [Audoría]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Eliminado
 */
router.delete('/:id', AuditoriaSistemaController.delete);

module.exports = router;
