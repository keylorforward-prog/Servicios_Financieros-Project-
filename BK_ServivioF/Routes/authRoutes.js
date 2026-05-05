// =====================================================
// Routes/authRoutes.js
// Rutas públicas de autenticación (no requieren token)
// =====================================================
const express        = require('express');
const router         = express.Router();
const AuthController = require('../Controller/AuthController');
const { verifyToken} = require('../Middleware/authMiddleware');

// ─── Swagger Component ────────────────────────────────
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: >
 *         Ingrese el token JWT obtenido en /auth/login con el prefijo **Bearer**.
 *         Ejemplo: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
 *
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - cedula_identidad
 *         - password
 *       properties:
 *         cedula_identidad:
 *           type: string
 *           example: "1-0234-0567"
 *         password:
 *           type: string
 *           format: password
 *           example: "MiPassword123"
 *
 *     TokenResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             empleado:
 *               type: object
 *               properties:
 *                 id:       { type: integer }
 *                 nombre:   { type: string  }
 *                 cedula:   { type: string  }
 *                 rol:      { type: string  }
 *                 sucursal: { type: string  }
 *             tokens:
 *               type: object
 *               properties:
 *                 accessToken:  { type: string }
 *                 refreshToken: { type: string }
 *                 tipo:         { type: string, example: "Bearer" }
 *                 expira_en:    { type: string, example: "8h"     }
 */

// ─── Tags ─────────────────────────────────────────────
/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints de login, refresh y perfil propio
 */

// ─── POST /auth/login ─────────────────────────────────
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     description: >
 *       Autentica un empleado con su cédula y contraseña.
 *       Devuelve un **accessToken** (8 h) y un **refreshToken** (7 d).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Campos obligatorios faltantes
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', AuthController.login);

// ─── POST /auth/refresh ───────────────────────────────
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Renovar access token
 *     tags: [Autenticación]
 *     description: >
 *       Envía el **refreshToken** para obtener un nuevo **accessToken**
 *       sin necesidad de volver a iniciar sesión.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nuevo accessToken generado
 *       401:
 *         description: Refresh token inválido o expirado
 */
router.post('/refresh', AuthController.refresh);

// ─── GET /auth/me ─────────────────────────────────────
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener perfil del empleado autenticado
 *     tags: [Autenticación]
 *     security:
 *       - BearerAuth: []
 *     description: Devuelve los datos del empleado que corresponde al token actual.
 *     responses:
 *       200:
 *         description: Datos del empleado
 *       401:
 *         description: Token ausente, inválido o expirado
 *       404:
 *         description: Empleado no encontrado
 */
router.get('/me', verifyToken, AuthController.me);

module.exports = router;
