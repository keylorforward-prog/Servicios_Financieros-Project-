// =====================================================
// app.js  –  Servidor principal de Cine_BK
// =====================================================
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const sequelize = require('./Config/db');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ──────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Ruta de prueba ──────────────────────────────────
app.get('/', (_req, res) => {
  res.json({ message: '🎬 API de Cine_BK funcionando correctamente' });
});

// ── Swagger Docs ────────────────────────────────────
const swaggerUi   = require('swagger-ui-express');
const swaggerSpec = require('./Config/swagger');
app.get('/docs.json', (req, res) => res.json(swaggerSpec));
app.use('/docs', ...swaggerUi.serve, swaggerUi.setup(swaggerSpec));
console.log('📖 Swagger Spec cargado en /docs y /docs.json');

// ── Routes ──────────────────────────────────────────
const routes = require('./Routes');
app.use('/api', routes);

// ── Iniciar servidor + verificar DB ─────────────────
async function startServer() {
  try {
    // 1. Verificar conexión a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // 2. Sincronizar modelos (crea tablas si no existen)
    //    Como usamos migraciones, esto solo verifica la conexión.
    //    Si quisieras que Sequelize cree las tablas automáticamente,
    //    descomenta la línea de abajo:
    // await sequelize.sync({ alter: true });

    // 3. Levantar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error.message);
    console.error('   Asegúrate de que MySQL esté corriendo y que la base de datos exista.');
    process.exit(1);
  }
}

startServer();