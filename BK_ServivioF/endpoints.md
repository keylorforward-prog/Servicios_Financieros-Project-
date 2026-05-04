# Documentación de Endpoints (API REST)

Esta es una referencia rápida de las rutas disponibles en la API y los ejemplos de carga útil (JSON) necesarios para los métodos `POST` y `PUT`. Para probarlos en vivo, visita: `http://localhost:3000/docs`

## Base URL: `/api`

### 🏢 Sucursales (`/sucursales`)
*   `GET /` - Lista todas las sucursales.
*   `GET /:id` - Obtiene detalle de una sucursal.
*   `POST /` - Crea una nueva sucursal.
*   `PUT /:id` - Actualiza datos de una sucursal.
*   `DELETE /:id` - Elimina una sucursal.

**Ejemplo JSON (POST/PUT):**
```json
{
  "nombre": "Sucursal Norte",
  "provincia": "Heredia",
  "canton": "Heredia",
  "direccion_fisica": "Frente al parque central",
  "efectivo_en_boveda": 10000000.00
}
```

### 👥 Clientes (`/clientes`)
*   `GET /` - Lista todos los clientes.
*   `GET /:id` - Obtiene detalle de un cliente.
*   `POST /` - Crea un nuevo cliente.
*   `PUT /:id` - Actualiza datos de un cliente.
*   `DELETE /:id` - Elimina un cliente.

**Ejemplo JSON (POST/PUT):**
```json
{
  "tipo_id": "Cédula Física",
  "identificacion": "1-5555-6666",
  "nombre_completo": "Ana López",
  "direccion_residencia": "Heredia Centro",
  "telefono": "8888-9999",
  "password": "miPasswordSeguro123"
}
```

### 👔 Empleados (`/empleados`)
*   `GET /` - Lista todos los empleados.
*   `GET /:id` - Obtiene detalle de un empleado.
*   `POST /` - Crea un nuevo empleado.
*   `PUT /:id` - Actualiza datos de un empleado.
*   `DELETE /:id` - Elimina un empleado.

**Ejemplo JSON (POST/PUT):**
```json
{
  "sucursal_id": 1,
  "rol_id": 2,
  "cedula_identidad": "1-7777-8888",
  "nombre_completo": "Pedro Picapiedra",
  "password": "password123"
}
```

### 💳 Cuentas (`/cuentas`)
*   `GET /` - Lista todas las cuentas.
*   `GET /:id` - Obtiene detalle de una cuenta.
*   `POST /` - Crea una nueva cuenta.
*   `PUT /:id` - Actualiza datos de una cuenta.
*   `DELETE /:id` - Elimina una cuenta.

**Ejemplo JSON (POST/PUT):**
```json
{
  "numero_cuenta": "CR040111222333",
  "cliente_id": 1,
  "sucursal_apertura_id": 1,
  "tipo_cuenta_id": 1,
  "moneda": "CRC",
  "saldo_actual": 0.00,
  "estado": "activa"
}
```

### 🎫 Talonarios (`/talonarios`)
*   `GET /` - Lista todos los talonarios.
*   `GET /:id` - Obtiene detalle de un talonario.
*   `POST /` - Crea un nuevo talonario.
*   `PUT /:id` - Actualiza datos de un talonario.
*   `DELETE /:id` - Elimina un talonario.

**Ejemplo JSON (POST/PUT):**
```json
{
  "cuenta_id": "CR010123456789",
  "tipo_talonario": "cheques",
  "serie_inicio": 201,
  "serie_fin": 250
}
```

### 💸 Transacciones (`/transacciones`)
*   `GET /` - Lista todas las transacciones de ventanilla.
*   `GET /:id` - Obtiene detalle de una transacción.
*   `POST /` - Crea una nueva transacción.
*   `PUT /:id` - Actualiza datos de una transacción.
*   `DELETE /:id` - Elimina una transacción.

**Ejemplo JSON (POST/PUT):**
```json
{
  "cuenta_id": "CR010123456789",
  "empleado_id": 2,
  "sucursal_id": 1,
  "monto": 15000.00,
  "tipo_operacion": "deposito",
  "numero_boleta_fisica": "DEP-999"
}
```

### 🔐 Roles (`/roles`)
*   `GET /` - Lista los roles disponibles.
*   `POST /` - Crea un nuevo rol.

**Ejemplo JSON (POST):**
```json
{
  "nombre_rol": "Auditor",
  "descripcion": "Rol con permisos de solo lectura para auditorías."
}
```

### 📋 Auditoría (`/auditoria`)
*   `GET /` - Consulta el historial de auditoría del sistema.

**Ejemplo JSON Estructura (Generalmente se inserta automáticamente):**
```json
{
  "empleado_id": 1,
  "tabla_afectada": "clientes",
  "registro_id": "5",
  "accion_realizada": "UPDATE",
  "valor_anterior": {"telefono": "8888-1111"},
  "valor_nuevo": {"telefono": "8888-2222"},
  "ip_terminal": "192.168.0.1",
  "detalles": "Actualización de teléfono de cliente"
}
```

---
*Nota: Todos los endpoints requieren el prefijo `/api`. Ejemplo: `http://localhost:3000/api/clientes`*
