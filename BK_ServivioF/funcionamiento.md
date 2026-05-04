# Documentación Técnica: Seguridad y Arquitectura

Este archivo contiene la información sobre el funcionamiento de la seguridad con Bcrypt y la arquitectura general del proyecto.

---

# 1. ¿Cómo funciona bcrypt.js?

`bcrypt.js` es una librería que permite cifrar contraseñas de forma segura utilizando un algoritmo de hash basado en el cifrado Blowfish.

## Conceptos Clave

### El Hash (Cifrado Irreversible)
Un **hash** es el resultado de transformar un texto en una cadena fija aleatoria. Es **unidireccional**: no se puede desencriptar.

### El Salt (Sal)
Añade datos aleatorios a la contraseña antes de cifrarla para evitar que dos usuarios con la misma contraseña tengan el mismo hash, protegiendo contra ataques de tablas precalculadas.

### Factor de Costo (Rounds)
Bcrypt es deliberadamente lento para dificultar ataques de fuerza bruta. Por defecto usamos 10 rounds.

## Flujo en el Proyecto
1. **Al Registrarse**: El hook `beforeCreate` genera un salt, combina la contraseña y guarda el hash.
2. **Al Iniciar Sesión**: Se compara el texto enviado con el hash guardado usando `bcrypt.compare()`.

---

# 2. Guía de Arquitectura (MVC)

El proyecto utiliza una arquitectura **MVC** para mantener el código organizado y escalable.

## Estructura
*   **Modelos**: Ubicados en `/Models`, definen la base de datos y la lógica de datos (como los hooks de cifrado).
*   **Controladores**: Ubicados en `/Controller`, procesan la lógica de negocio y peticiones.
*   **Rutas**: Ubicadas en `/Routes`, definen los puntos de acceso de la API.

## Seguridad en Modelos
*   **Hooks**: Cifrado automático antes de guardar.
*   **toJSON**: Ocultación automática de la contraseña en las respuestas de la API para evitar fugas de información.

---
*Documentación generada por el Arquitecto de Software.*
