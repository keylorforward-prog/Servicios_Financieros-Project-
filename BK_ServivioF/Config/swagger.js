const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Servicio Financiero',
      version: '1.0.0',
      description: 'Documentación de la API para el sistema de servicios financieros (MVC)',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor Local',
      },
    ],
    paths: {
      '/ping': {
        get: {
          summary: 'Prueba de conexión',
          responses: {
            200: {
              description: 'OK'
            }
          }
        }
      }
    }
  },
  // Archivos donde Swagger buscará los comentarios JSDoc
  apis: [path.join(__dirname, '../Routes/*.js')], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
