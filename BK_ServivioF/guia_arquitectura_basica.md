# Guía para Principiantes: ¿Cómo funciona este proyecto por dentro? 🚀

*   **La Base de Datos (MySQL):** Es la enorme bodega donde guardamos todos nuestros ingredientes (los datos).
*   **Models (Modelos):** Son los administradores de la bodega.
*   **Routes (Rutas):** Son los meseros.
*   **Controllers (Controladores):** Son los chefs en la cocina.
*   **`app.js`:** Es el Gerente del restaurante.

A continuación, vamos a ver qué hace exactamente cada uno en tu proyecto.

---

## 1. `app.js` (El Gerente del Restaurante) 👔
Este es el archivo principal. Cuando escribes `npm start` en la terminal, estás "despertando" a este archivo.

**¿Qué responsabilidades tiene?**
1. **Abre las puertas:** Enciende el servidor (`app.listen(3000)`) para que el restaurante empiece a recibir clientes (peticiones).

2. **Pone reglas generales:** Configura `express.json()` (dice "en este restaurante solo hablamos en formato JSON") y `cors` ("aceptamos clientes de cualquier navegador web").

3. **Contrata a los meseros:** Aquí le decimos a la app qué rutas existen. Por ejemplo: `app.use('/api/clientes', clienteRoutes);` significa "Si alguien pregunta por clientes, llama al mesero experto en clientes".

4. **Verifica la bodega:** Conecta con la base de datos (`sequelize.authenticate()`) para asegurarse de que no se ha caído antes de abrir el local.

5. **Prepara el menú:** Levanta Swagger en `/docs` para que todos puedan leer qué servicios ofrecemos.

---

## 2. Models / Modelos (Los Administradores de la Bodega) 📦
Están en la carpeta `/Models` (ej. `Cliente.js`, `Cuenta.js`).

Tu base de datos es MySQL, pero Javascript no habla "SQL" de forma nativa. Los modelos son **Traductores**. Usan una herramienta llamada **Sequelize** (un ORM) para convertir objetos de Javascript en tablas de base de datos reales.

**¿Qué hace un Modelo?**
*   **Define las reglas de los ingredientes:** Le dice a la base de datos exactamente cómo debe ser un Cliente.
    ```javascript
    nombre_completo: {
      type: DataTypes.STRING, // "Esto tiene que ser texto"
      allowNull: false,       // "No permito que se guarde vacío (obligatorio)"
    }
    ```
*   Los modelos **son los ÚNICOS que tocan la base de datos**. Si alguien quiere un dato, tiene que pedírselo al modelo.

---

## 3. Routes / Rutas (Los Meseros) 🤵
Están en la carpeta `/Routes` (ej. `clienteRoutes.js`).

Cuando un usuario desde su computadora o desde Swagger entra a una URL, el mesero lo atiende.
**¿Qué hace una Ruta?**
*   Simplemente toma el "pedido" (petición HTTP) y se lo pasa al Chef correcto (Controlador).
    ```javascript
    // "Si alguien hace un GET a la ruta raíz (/), llama al Chef getAll"
    router.get('/', ClienteController.getAll);
    ```
*   **No cocina:** Las rutas NO tienen lógica. No buscan en la base de datos ni validan contraseñas. Solo dirigen el tráfico.

---

## 4. Controllers / Controladores (Los Chefs) 👨‍🍳
Están en la carpeta `/Controller` (ej. `ClienteController.js`). Aquí está la verdadera "Lógica de Negocio".

El Controlador recibe el pedido del Mesero (Route), va a pedirle los ingredientes al Administrador de Bodega (Model), "cocina" la respuesta y se la devuelve al cliente.

**Ejemplo paso a paso de un Controlador (`getAll`):**
```javascript
exports.getAll = async (req, res) => {
  try {
    // 1. El chef (Controlador) le dice al modelo: "Tráeme TODOS los clientes"
    const clientes = await Cliente.findAll();
    
    // 2. El chef empaca la comida (Status 200 = OK) y se la manda al cliente en formato JSON
    res.status(200).json(clientes);
    
  } catch (error) {
    // 3. ¡Si se quema la comida o falla la refri! Le damos una disculpa al cliente (Status 500 = Error de servidor)
    res.status(500).json({ error: error.message });
  }
};
```

Los controladores suelen tener 5 funciones básicas (llamadas CRUD por sus siglas en inglés):
*   `getAll` (Leer todos)
*   `getById` (Leer uno específico)
*   `create` (Crear / Insertar)
*   `update` (Actualizar / Modificar)
*   `delete` (Eliminar)

---

## 🔄 El Viaje Completo de una Petición (Ejemplo)

Veamos qué pasa en tu código cuando alguien da clic en "Consultar Clientes" en Swagger:

1. **El Usuario** entra a `http://localhost:3000/api/clientes`.

2. **`app.js` (El Gerente)** ve la url `/api/clientes` y dice: *"¡Ah! Esto le toca al mesero de clientes"*. Y manda la petición a `clienteRoutes.js`.

3. **`clienteRoutes.js` (El Mesero)** ve que el usuario hizo un `GET` (quiere leer información) y dice: *"Entendido, le diré al Chef que prepare la función getAll"*. Y llama a `ClienteController.getAll`.

4. **`ClienteController.js` (El Chef)** recibe la orden. Inmediatamente va donde **`Cliente.js` (El Modelo)** y le ejecuta el comando `await Cliente.findAll()`.

5. **`Cliente.js` (El Modelo)** va a la base de datos MySQL de forma secreta, extrae toda la tabla de clientes, los convierte a código Javascript y se los entrega al Chef.

6. **El Chef (Controlador)** recibe los clientes, los empaqueta bonito (`res.json()`) y se los entrega de vuelta al usuario.

¡Y listo! Esa es la arquitectura **MVC (Model - View - Controller)**. Aunque en nuestro caso, como es una API, la "Vista" (View) es simplemente tu Frontend (React) o el Swagger que consume este JSON.
