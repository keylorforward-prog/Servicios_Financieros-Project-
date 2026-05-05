const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title      : 'API de Servicio Financiero',
      version    : '2.0.0',
      description: `
Documentación de la API para el sistema de servicios financieros (MVC).

## Autenticación
Esta API usa **JWT (JSON Web Token)**.

1. Llama a \`POST /auth/login\` con tu cédula y contraseña.
2. Copia el \`accessToken\` de la respuesta.
3. Haz clic en el botón **Authorize 🔒** (arriba a la derecha) e ingresa:
   \`Bearer <tu_token>\`
4. Todos los endpoints protegidos usarán ese token automáticamente.

El accessToken expira en **8 horas**. Usa \`POST /auth/refresh\` para renovarlo.
      `,
    },
    servers: [
      {
        url        : 'http://localhost:3000/api',
        description: 'Servidor Local de Desarrollo',
      },
    ],
    // ── Esquema de seguridad global ─────────────────────
    components: {
      securitySchemes: {
        BearerAuth: {
          type        : 'http',
          scheme      : 'bearer',
          bearerFormat: 'JWT',
          description : 'Ingrese el token con el prefijo Bearer. Ej: "Bearer eyJhbGci..."',
        },
      },
    },
    // ── Seguridad global (aplica a todos los endpoints) ─
    // Los endpoints públicos pueden sobreescribir con security: []
    security: [{ BearerAuth: [] }],
  },
  // Archivos donde Swagger buscará los comentarios JSDoc
  apis: [path.join(__dirname, '../Routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

