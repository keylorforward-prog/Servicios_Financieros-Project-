const sequelize = require('../Config/db');

const Sucursal = require('./Sucursal');
const Rol = require('./Rol');
const Empleado = require('./Empleado');
const Cliente = require('./Cliente');
const TipoCuenta = require('./Tipocuenta');
const Cuenta = require('./Cuenta');
const Talonario = require('./Taloranio');
const TransaccionVentanilla = require('./Transaccionventanilla');
const AuditoriaSistema = require('./Auditoriasistema');

// Empleado associations
Empleado.belongsTo(Sucursal, { foreignKey: 'sucursal_id', as: 'sucursal' });
Empleado.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });
Sucursal.hasMany(Empleado, { foreignKey: 'sucursal_id', as: 'empleados' });
Rol.hasMany(Empleado, { foreignKey: 'rol_id', as: 'empleados' });

// Cuenta associations
Cuenta.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'cliente' });
Cuenta.belongsTo(Sucursal, { foreignKey: 'sucursal_apertura_id', as: 'sucursal_apertura' });
Cuenta.belongsTo(TipoCuenta, { foreignKey: 'tipo_cuenta_id', as: 'tipo_cuenta' });
Cliente.hasMany(Cuenta, { foreignKey: 'cliente_id', as: 'cuentas' });
Sucursal.hasMany(Cuenta, { foreignKey: 'sucursal_apertura_id', as: 'cuentas_aperturadas' });
TipoCuenta.hasMany(Cuenta, { foreignKey: 'tipo_cuenta_id', as: 'cuentas' });

// Talonario associations
Talonario.belongsTo(Cuenta, { foreignKey: 'cuenta_id', as: 'cuenta' });
Cuenta.hasMany(Talonario, { foreignKey: 'cuenta_id', as: 'talonarios' });

// TransaccionVentanilla associations
TransaccionVentanilla.belongsTo(Cuenta, { foreignKey: 'cuenta_id', as: 'cuenta' });
TransaccionVentanilla.belongsTo(Empleado, { foreignKey: 'empleado_id', as: 'empleado' });
TransaccionVentanilla.belongsTo(Sucursal, { foreignKey: 'sucursal_id', as: 'sucursal' });
Cuenta.hasMany(TransaccionVentanilla, { foreignKey: 'cuenta_id', as: 'transacciones' });
Empleado.hasMany(TransaccionVentanilla, { foreignKey: 'empleado_id', as: 'transacciones' });
Sucursal.hasMany(TransaccionVentanilla, { foreignKey: 'sucursal_id', as: 'transacciones' });

// AuditoriaSistema associations
AuditoriaSistema.belongsTo(Empleado, { foreignKey: 'empleado_id', as: 'empleado' });
Empleado.hasMany(AuditoriaSistema, { foreignKey: 'empleado_id', as: 'auditorias' });

module.exports = {
  sequelize,
  Sucursal,
  Rol,
  Empleado,
  Cliente,
  TipoCuenta,
  Cuenta,
  Talonario,
  TransaccionVentanilla,
  AuditoriaSistema,
};