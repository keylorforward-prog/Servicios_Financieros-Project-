# 🔐 JWT en Servicio Financiero — Guía Completa

## ¿Qué es JWT y por qué lo usamos?

**JWT (JSON Web Token)** es un estándar para transmitir información de forma segura entre el cliente y el servidor usando tokens firmados digitalmente. En este proyecto reemplaza el sistema de sesiones del lado del servidor: **el servidor no guarda nada**, toda la info del empleado viaja dentro del token.

---

## 🗺️ Arquitectura General

```
Cliente (Postman / Frontend)
        │
        │  POST /api/auth/login
        │  { cedula_identidad, password }
        ▼
┌─────────────────────────┐
│    AuthController.js    │  ← Verifica credenciales con bcrypt
│    Controller/          │  ← Consulta Empleado + Rol en la DB
└────────────┬────────────┘
             │ Genera dos tokens
             ▼
┌─────────────────────────────────────────────┐
│  accessToken  (JWT_SECRET,  expira en 8h)   │
│  refreshToken (JWT_REFRESH_SECRET, 7 días)  │
└─────────────────────────────────────────────┘
             │
             │ El cliente guarda los tokens
             ▼
        Peticiones posteriores:
        Authorization: Bearer <accessToken>
             │
             ▼
┌──────────────────────────┐
│   authMiddleware.js      │  ← Verifica firma + expiración
│   Middleware/            │  ← Inyecta req.empleado
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│   roleMiddleware.js      │  ← ¿Tiene el rol correcto?
│   Middleware/            │
└────────────┬─────────────┘
             │
             ▼
     ✅ Controller (getAll, create, etc.)
```

---

## 📦 Estructura de archivos JWT

```
BK_ServivioF/
├── Controller/
│   └── AuthController.js       ← Login / Refresh / Me
├── Middleware/
│   ├── authMiddleware.js        ← verifyToken
│   └── roleMiddleware.js        ← authorizeRoles(...)
├── Routes/
│   ├── authRoutes.js            ← /auth/login, /auth/refresh, /auth/me
│   └── index.js                 ← registra /auth
└── .env                         ← JWT_SECRET, JWT_EXPIRES_IN, etc.
```

---

## 🔑 Las dos claves secretas (`.env`)

```env
JWT_SECRET=...              # Firma el accessToken  (8 horas)
JWT_REFRESH_SECRET=...      # Firma el refreshToken (7 días)
```

> Son **distintas** por seguridad. Si alguien roba una, la otra sigue siendo segura.

---

## 1️⃣ Login — `POST /api/auth/login`

**Archivo:** `Controller/AuthController.js` → método `login`

### Qué recibe:
```json
{
  "cedula_identidad": "1-0234-0567",
  "password": "MiPassword123"
}
```

### Qué hace internamente:
```
1. Busca al empleado por cédula en la tabla `empleados`
   (incluye su Rol y Sucursal con eager loading)

2. Compara la contraseña enviada con el hash bcrypt guardado en DB:
   bcrypt.compare(password, empleado.getDataValue('password'))

3. Si es válido → genera dos tokens con jwt.sign()

4. Devuelve la respuesta
```

### Qué devuelve:
```json
{
  "success": true,
  "message": "Login exitoso.",
  "data": {
    "empleado": {
      "id": 1,
      "nombre": "Juan Pérez",
      "cedula": "1-0234-0567",
      "rol": "Administrador",
      "sucursal": "Sucursal Central"
    },
    "tokens": {
      "accessToken":  "eyJhbGci...",
      "refreshToken": "eyJhbGci...",
      "tipo":         "Bearer",
      "expira_en":    "8h"
    }
  }
}
```

### ¿Por qué el mensaje es genérico si la cédula no existe?
```
❌ MAL:  "La cédula no existe en el sistema"   ← enumera usuarios
✅ BIEN: "Credenciales incorrectas"             ← no revela nada
```

---

## 2️⃣ El Token por dentro

El `accessToken` es una cadena en tres partes separadas por puntos:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   ← Header  (algoritmo: HS256)
.eyJpZCI6MSwiY2VkdWxhIjoiMS0wMjM0...   ← Payload (datos del empleado)
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6...   ← Signature (firma con JWT_SECRET)
```

### Payload decodificado (lo que `jwt.verify()` devuelve):
```json
{
  "id":          1,
  "cedula":      "1-0234-0567",
  "nombre":      "Juan Pérez",
  "rol_id":      1,
  "rol_nombre":  "Administrador",
  "sucursal_id": 2,
  "iat":         1746432000,
  "exp":         1746460800
}
```

> `iat` = "issued at" (cuándo se creó)  
> `exp` = "expires at" (cuándo expira — automático en `jwt.verify`)

---

## 3️⃣ verifyToken — `Middleware/authMiddleware.js`

Se aplica a **todas las rutas protegidas**. Corre antes del controller.

### Flujo interno:
```
Request llega con:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
       │
       ▼
¿Existe el header? ¿Empieza con "Bearer "?
       │ NO → 401 "No se proporcionó token"
       │ SI ↓
       ▼
jwt.verify(token, JWT_SECRET)
       │
       ├── TokenExpiredError → 401 "Token expirado"
       ├── JsonWebTokenError → 401 "Token inválido"
       │
       └── ✅ Válido → req.empleado = payload → next()
```

### Cómo acceder al empleado en un controller:
```js
// En cualquier controller de una ruta protegida:
const MiController = {
  getAll: async (req, res) => {
    console.log(req.empleado.nombre);      // "Juan Pérez"
    console.log(req.empleado.rol_nombre);  // "Administrador"
    console.log(req.empleado.id);          // 1
  }
};
```

---

## 4️⃣ authorizeRoles — `Middleware/roleMiddleware.js`

Corre **después** de `verifyToken`. Compara el rol del payload con los roles permitidos.

### Sintaxis en las rutas:
```js
const { verifyToken }    = require('../Middleware/authMiddleware');
const { authorizeRoles } = require('../Middleware/roleMiddleware');

// Cualquier empleado autenticado
router.get('/', verifyToken, MiController.getAll);

// Solo Administradores
router.post('/', verifyToken, authorizeRoles('Administrador'), MiController.create);

// Administradores o Supervisores
router.put('/:id', verifyToken, authorizeRoles('Administrador', 'Supervisor'), MiController.update);

// Solo Cajeros
router.post('/transaccion', verifyToken, authorizeRoles('Cajero'), TransaccionCtrl.create);
```

### ¿De dónde salen los nombres de los roles?
```
Los nombres deben coincidir EXACTAMENTE con el campo `nombre_rol`
de la tabla `roles` en la base de datos.

Ejemplo tabla roles:
┌────────┬──────────────────┐
│ idRol  │ nombre_rol       │
├────────┼──────────────────┤
│   1    │ Administrador    │
│   2    │ Cajero           │
│   3    │ Supervisor       │
└────────┴──────────────────┘
```

---

## 5️⃣ Refresh Token — `POST /api/auth/refresh`

Cuando el `accessToken` expira (8h), en vez de volver a pedir usuario/contraseña, se usa el `refreshToken` (7 días) para obtener uno nuevo.

```json
// Body del request:
{ "refreshToken": "eyJhbGci..." }

// Respuesta:
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGci...",  ← NUEVO token
    "tipo":        "Bearer",
    "expira_en":   "8h"
  }
}
```

> El `refreshToken` NO se renueva automáticamente. Cuando expira (7 días), el usuario debe hacer login nuevamente.

---

## 6️⃣ Me — `GET /api/auth/me`

Devuelve los datos frescos del empleado autenticado (consultando la DB, no solo el payload del token).

```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <accessToken>"
```

Útil para que el frontend cargue el perfil del usuario al iniciar.

---

## 🧭 Cómo probarlo en Swagger (`/docs`)

```
1. Abre http://localhost:3000/docs

2. Busca POST /auth/login y ejecuta con tu cédula y password.

3. Copia el accessToken de la respuesta.

4. Haz clic en el botón "Authorize 🔓" (arriba a la derecha).

5. En el campo escribe:
   Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

6. Haz clic en "Authorize" → "Close".

7. Ahora todos los endpoints con 🔒 usarán tu token automáticamente.
```

---

## 🔒 Tabla de seguridad por endpoint

| Endpoint | Método | Token | Roles |
|---|---|---|---|
| `/auth/login` | POST | ❌ Público | — |
| `/auth/refresh` | POST | ❌ Público | — |
| `/auth/me` | GET | ✅ Requerido | Cualquiera |
| `/empleados` | GET | ✅ Requerido | Cualquiera |
| `/empleados` | POST | ✅ Requerido | Administrador |
| `/empleados/:id` | PUT | ✅ Requerido | Administrador |
| `/empleados/:id` | DELETE | ✅ Requerido | Administrador |
| `/clientes` | GET | ✅ Requerido | Cualquiera |
| `/cuentas` | GET | ✅ Requerido | Cualquiera |
| `/transacciones` | POST | ✅ Requerido | Cajero, Admin |
| `/auditoria` | GET | ✅ Requerido | Administrador |

> ⚠️ La columna "Roles" de las rutas no-empleado refleja la recomendación. Aplica los middlewares según la lógica del negocio.

---

## ⚠️ Errores más comunes

| Código | Mensaje | Causa |
|---|---|---|
| `401` | No se proporcionó token | Falta el header `Authorization` |
| `401` | Token expirado | Han pasado más de 8h, usa `/auth/refresh` |
| `401` | Token inválido | El token fue modificado o es incorrecto |
| `401` | Credenciales incorrectas | Cédula o password incorrectos en el login |
| `403` | Acceso denegado | Tu rol no tiene permiso para esa acción |

---

## 🛡️ Buenas prácticas aplicadas

- **Secrets en `.env`**, nunca en el código fuente
- **Dos secrets distintos** para `accessToken` y `refreshToken`
- **Access token de corta duración** (8h) + refresh de larga (7d)
- **Mensaje genérico** en login fallido (no enumera usuarios)
- **Password nunca en respuesta** (`toJSON()` en el modelo Empleado lo elimina)
- **Rol en el payload** → evita consultas extra a la DB por cada petición
- **Defensa en profundidad** → `roleMiddleware` verifica `req.empleado` independientemente

---

*Generado para Servicio Financiero API v2.0.0*
