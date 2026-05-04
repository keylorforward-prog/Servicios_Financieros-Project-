# Documentación de Endpoints (API REST)

Esta es una referencia rápida de las rutas disponibles en la API. Para una documentación interactiva con ejemplos de JSON, visita: `http://localhost:3000/api-docs`

## Base URL: `/api`

### 🏢 Sucursales (`/sucursales`)
*   `GET /` - Lista todas las sucursales.
*   `GET /:id` - Obtiene detalle de una sucursal.
*   `POST /` - Crea una nueva sucursal.
*   `PUT /:id` - Actualiza datos de una sucursal.
*   `DELETE /:id` - Elimina una sucursal.

### 👥 Clientes (`/clientes`)
*   `GET /` - Lista todos los clientes.
*   `GET /:id` - Obtiene detalle de un cliente.
*   `POST /` - Crea un nuevo cliente.
*   `PUT /:id` - Actualiza datos de un cliente.
*   `DELETE /:id` - Elimina un cliente.

### 👔 Empleados (`/empleados`)
*   `GET /` - Lista todos los empleados (incluye Rol y Sucursal).
*   `GET /:id` - Obtiene detalle de un empleado.
*   `POST /` - Crea un nuevo empleado.
*   `PUT /:id` - Actualiza datos de un empleado.
*   `DELETE /:id` - Elimina un empleado.

### 💳 Cuentas (`/cuentas`)
*   `GET /` - Lista todas las cuentas (incluye Cliente, Sucursal y Tipo).
*   `GET /:id` - Obtiene detalle de una cuenta.
*   `POST /` - Crea una nueva cuenta.
*   `PUT /:id` - Actualiza datos de una cuenta.
*   `DELETE /:id` - Elimina una cuenta.

### 🎫 Talonarios (`/talonarios`)
*   `GET /` - Lista todos los talonarios.
*   `GET /:id` - Obtiene detalle de un talonario.
*   `POST /` - Crea un nuevo talonario.
*   `PUT /:id` - Actualiza datos de un talonario.
*   `DELETE /:id` - Elimina un talonario.

### 💸 Transacciones (`/transacciones`)
*   `GET /` - Lista todas las transacciones de ventanilla.
*   `GET /:id` - Obtiene detalle de una transacción.
*   `POST /` - Crea una nueva transacción.
*   `PUT /:id` - Actualiza datos de una transacción.
*   `DELETE /:id` - Elimina una transacción.

### 🔐 Roles (`/roles`)
*   `GET /` - Lista los roles disponibles.
*   `POST /` - Crea un nuevo rol.

### 📋 Auditoría (`/auditoria`)
*   `GET /` - Consulta el historial de auditoría del sistema.

---
*Nota: Todos los endpoints requieren el prefijo `/api`. Ejemplo: `http://localhost:3000/api/clientes`*
