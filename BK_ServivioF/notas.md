# Notas Importantes de Arquitectura: Sistema Financiero

## Error de Integridad Referencial (Foreign Key Constraint)

Cuando intentas eliminar un cliente usando Swagger y obtienes el siguiente error:
`"Cannot delete or update a parent row: a foreign key constraint fails..."`

**Este error es intencional y deseado.**

La base de datos se está protegiendo. En la tabla `cuentas`, la llave foránea `cliente_id` tiene configurada la regla `ON DELETE RESTRICT`. Esto significa que el motor de la base de datos (MySQL) **nunca permitirá eliminar un Cliente si este tiene Cuentas bancarias asociadas**. 

Imagina el caos en un banco real si borras a un cliente y sus cuentas (junto con el dinero) quedan flotando "huérfanas" en el sistema. Para realizar un borrado real (`HARD DELETE`), primero tendrías que borrar todo el historial del cliente (transacciones, talonarios, cuentas), lo cual viola los principios de auditoría de un sistema financiero.

---

## Solución: Eliminación Lógica (Soft Delete)

Como lo anotaste en el archivo del modelo `Cliente.js`:
> *"Se podria implemetar un cliente_activo con una boolean 0 no 1 activo"*

En sistemas financieros y empresariales **nunca se borran registros de la base de datos** de forma definitiva. Lo que se hace es una "Eliminación Lógica".

### ¿Cómo funciona?
1. Se agrega una columna nueva a la tabla (por ejemplo: `cliente_activo` tipo `BOOLEAN` con valor por defecto `true`).
2. Cuando el usuario presiona "Eliminar", el controlador en la API no ejecuta un `DELETE` en SQL. En su lugar, ejecuta un `UPDATE` cambiando `cliente_activo = false`.
3. Para el usuario final y para las listas de consulta (GET), el cliente "desaparece" porque las consultas se filtran (`SELECT * FROM clientes WHERE cliente_activo = true`).
4. **Beneficio:** La base de datos mantiene todo el historial financiero y transaccional intacto por razones legales y de auditoría del banco, sin romper ninguna relación.
