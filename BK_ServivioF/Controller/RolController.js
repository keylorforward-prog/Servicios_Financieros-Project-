const { Rol } = require('../Models');

const RolController = {
  getAll: async (req, res) => {
    try {
      const roles = await Rol.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const rol = await Rol.findByPk(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Rol no encontrado' });
      res.json(rol);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoRol = await Rol.create(req.body);
      res.status(201).json(nuevoRol);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const rol = await Rol.findByPk(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Rol no encontrado' });
      await rol.update(req.body);
      res.json(rol);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const rol = await Rol.findByPk(req.params.id);
      if (!rol) return res.status(404).json({ error: 'Rol no encontrado' });
      await rol.destroy();
      res.json({ message: 'Rol eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = RolController;
