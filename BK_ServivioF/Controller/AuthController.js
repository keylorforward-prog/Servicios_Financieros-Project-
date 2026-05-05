// =====================================================
// Controller/AuthController.js
// Maneja login y refresh de tokens JWT.
// =====================================================
const jwt    = require('jsonwebtoken');
const { Empleado, Rol, Sucursal } = require('../Models');

const JWT_SECRET         = process.env.JWT_SECRET;
const JWT_EXPIRES_IN     = process.env.JWT_EXPIRES_IN     || '8h';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRES= process.env.JWT_REFRESH_EXPIRES|| '7d';

// ─── Helper: generar access token ────────────────────
const generarAccessToken = (empleado) => {
  return jwt.sign(
    {
      id         : empleado.idEmpleado,
      cedula     : empleado.cedula_identidad,
      nombre     : empleado.nombre_completo,
      rol_id     : empleado.rol_id,
      rol_nombre : empleado.rol ? empleado.rol.nombre_rol : null,
      sucursal_id: empleado.sucursal_id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// ─── Helper: generar refresh token ───────────────────
const generarRefreshToken = (empleadoId) => {
  return jwt.sign(
    { id: empleadoId },
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES }
  );
};

const AuthController = {

  /**
   * POST /api/auth/login
   * Body: { cedula_identidad, password }
   *
   * Flujo:
   *  1. Buscar empleado por cédula (incluye rol)
   *  2. Verificar contraseña con bcrypt (método del modelo)
   *  3. Generar access token (8 h) y refresh token (7 d)
   *  4. Devolver tokens + datos básicos del empleado
   */
  login: async (req, res) => {
    try {
      const { cedula_identidad, password } = req.body;

      // Validar que vengan los campos
      if (!cedula_identidad || !password) {
        return res.status(400).json({
          success: false,
          message: 'La cédula y la contraseña son obligatorias.',
        });
      }

      // Buscar empleado (sin excluir password aquí, lo necesitamos para validar)
      const empleado = await Empleado.scope('withPassword').findOne({
        where: { cedula_identidad },
        include: [
          { model: Rol,      as: 'rol'      },
          { model: Sucursal, as: 'sucursal' },
        ],
      }).catch(() =>
        // Si no existe el scope, buscar sin él
        Empleado.findOne({
          where: { cedula_identidad },
          include: [
            { model: Rol,      as: 'rol'      },
            { model: Sucursal, as: 'sucursal' },
          ],
        })
      );

      if (!empleado) {
        // Respuesta genérica por seguridad (no revelar si existe o no)
        return res.status(401).json({
          success: false,
          message: 'Credenciales incorrectas.',
        });
      }

      // Obtener password real desde dataValues (toJSON lo elimina)
      const passwordHash = empleado.getDataValue('password');
      const bcrypt = require('bcryptjs');
      const passwordValida = await bcrypt.compare(password, passwordHash);

      if (!passwordValida) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales incorrectas.',
        });
      }

      // Generar tokens
      const accessToken  = generarAccessToken(empleado);
      const refreshToken = generarRefreshToken(empleado.idEmpleado);

      return res.status(200).json({
        success: true,
        message: 'Login exitoso.',
        data: {
          empleado: {
            id             : empleado.idEmpleado,
            nombre         : empleado.nombre_completo,
            cedula         : empleado.cedula_identidad,
            rol            : empleado.rol?.nombre_rol,
            sucursal       : empleado.sucursal?.nombre_sucursal,
          },
          tokens: {
            accessToken,
            refreshToken,
            tipo          : 'Bearer',
            expira_en     : JWT_EXPIRES_IN,
          },
        },
      });
    } catch (error) {
      console.error('[AuthController.login]', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor.',
      });
    }
  },

  /**
   * POST /api/auth/refresh
   * Body: { refreshToken }
   *
   * Genera un nuevo access token si el refresh token es válido.
   */
  refresh: async (req, res) => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'El refreshToken es obligatorio.',
        });
      }

      let payload;
      try {
        payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
      } catch (err) {
        const msg = err.name === 'TokenExpiredError'
          ? 'Refresh token expirado. Inicie sesión nuevamente.'
          : 'Refresh token inválido.';
        return res.status(401).json({ success: false, message: msg });
      }

      // Recargar datos frescos del empleado
      const empleado = await Empleado.findByPk(payload.id, {
        include: [
          { model: Rol,      as: 'rol'      },
          { model: Sucursal, as: 'sucursal' },
        ],
      });

      if (!empleado) {
        return res.status(401).json({
          success: false,
          message: 'Empleado no encontrado.',
        });
      }

      const newAccessToken = generarAccessToken(empleado);

      return res.status(200).json({
        success: true,
        data: {
          accessToken: newAccessToken,
          tipo       : 'Bearer',
          expira_en  : JWT_EXPIRES_IN,
        },
      });
    } catch (error) {
      console.error('[AuthController.refresh]', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor.',
      });
    }
  },

  /**
   * GET /api/auth/me
   * Header: Authorization: Bearer <token>
   *
   * Devuelve los datos del empleado autenticado (del payload).
   */
  me: async (req, res) => {
    try {
      // req.empleado ya fue inyectado por verifyToken
      const empleado = await Empleado.findByPk(req.empleado.id, {
        include: [
          { model: Rol,      as: 'rol'      },
          { model: Sucursal, as: 'sucursal' },
        ],
      });

      if (!empleado) {
        return res.status(404).json({
          success: false,
          message: 'Empleado no encontrado.',
        });
      }

      return res.status(200).json({
        success: true,
        data: empleado,
      });
    } catch (error) {
      console.error('[AuthController.me]', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor.',
      });
    }
  },
};

module.exports = AuthController;
