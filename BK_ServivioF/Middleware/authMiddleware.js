// =====================================================
// Middleware/authMiddleware.js
// Verifica que el request lleve un JWT válido y activo.
// =====================================================
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * verifyToken
 * ----------
 * Extrae el Bearer token del header Authorization, lo valida
 * y, si es correcto, inyecta `req.empleado` con el payload
 * para que los controllers y siguientes middlewares lo usen.
 *
 * Errores posibles:
 *  401 – No se proporcionó token
 *  401 – Token expirado (TokenExpiredError)
 *  401 – Token inválido / manipulado (JsonWebTokenError)
 */
const verifyToken = (req, res, next) => {
  // 1. Buscar el header
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Acceso denegado: no se proporcionó token de autenticación.',
    });
  }

  // 2. Separar "Bearer <token>"
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verificar firma y expiración
    const payload = jwt.verify(token, JWT_SECRET);

    // 4. Adjuntar el payload al objeto request
    req.empleado = payload; // { id, cedula, nombre, rol_id, rol_nombre, iat, exp }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado. Por favor inicie sesión nuevamente.',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Token inválido o manipulado.',
    });
  }
};

module.exports = { verifyToken };
