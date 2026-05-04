const { Sucursal } = require('../Models');

const SucursalController = {
  getAll: async (req, res) => {
    try {
      const sucursales = await Sucursal.findAll();
      res.json(sucursales);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const sucursal = await Sucursal.findByPk(req.params.id);
      if (!sucursal) return res.status(404).json({ error: 'Sucursal no encontrada' });
      res.json(sucursal);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaSucursal = await Sucursal.create(req.body);
      res.status(201).json(nuevaSucursal);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const sucursal = await Sucursal.findByPk(req.params.id);
      if (!sucursal) return res.status(404).json({ error: 'Sucursal no encontrada' });
      await sucursal.update(req.body);
      res.json(sucursal);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const sucursal = await Sucursal.findByPk(req.params.id);
      if (!sucursal) return res.status(404).json({ error: 'Sucursal no encontrada' });
      await sucursal.destroy();
      res.json({ message: 'Sucursal eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = SucursalController;
