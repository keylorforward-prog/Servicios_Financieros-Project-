// =====================================================
// Middleware/roleMiddleware.js
// Controla el acceso basado en el rol del empleado.
// =====================================================

/**
 * authorizeRoles(...rolesPermitidos)
 * -----------------------------------
 * Factory que devuelve un middleware de autorización.
 * Debe usarse DESPUÉS de `verifyToken`.
 *
 * Uso en una ruta:
 *   router.delete('/:id', verifyToken, authorizeRoles('Administrador'), ctrl.delete);
 *
 * Los roles permitidos se comparan contra `req.empleado.rol_nombre`
 * (campo incluido en el payload del JWT al hacer login).
 *
 * Errores:
 *  403 – El rol del empleado no está en la lista de roles permitidos.
 */
const authorizeRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.empleado) {
      // Esto no debería ocurrir si verifyToken corrió antes,
      // pero se maneja como defensa en profundidad.
      return res.status(401).json({
        success: false,
        message: 'No autenticado.',
      });
    }

    const rolEmpleado = req.empleado.rol_nombre;

    if (!rolesPermitidos.includes(rolEmpleado)) {
      return res.status(403).json({
        success: false,
        message: `Acceso denegado. Se requiere uno de los siguientes roles: ${rolesPermitidos.join(', ')}.`,
        tu_rol: rolEmpleado,
      });
    }

    next();
  };
};

module.exports = { authorizeRoles };
