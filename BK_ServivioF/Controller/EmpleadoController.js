const { Empleado, Sucursal, Rol } = require('../Models');

const EmpleadoController = {
  getAll: async (req, res) => {
    try {
      const empleados = await Empleado.findAll({
        include: [
          { model: Sucursal, as: 'sucursal' },
          { model: Rol, as: 'rol' }
        ]
      });
      res.json(empleados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const empleado = await Empleado.findByPk(req.params.id, {
        include: [
          { model: Sucursal, as: 'sucursal' },
          { model: Rol, as: 'rol' }
        ]
      });
      if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
      res.json(empleado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoEmpleado = await Empleado.create(req.body);
      res.status(201).json(nuevoEmpleado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const empleado = await Empleado.findByPk(req.params.id);
      if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
      await empleado.update(req.body);
      res.json(empleado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const empleado = await Empleado.findByPk(req.params.id);
      if (!empleado) return res.status(404).json({ error: 'Empleado no encontrado' });
      await empleado.destroy();
      res.json({ message: 'Empleado eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = EmpleadoController;
