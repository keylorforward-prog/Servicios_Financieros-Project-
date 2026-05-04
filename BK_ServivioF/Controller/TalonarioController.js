const { Talonario, Cuenta } = require('../Models');

const TalonarioController = {
  getAll: async (req, res) => {
    try {
      const talonarios = await Talonario.findAll({
        include: [{ model: Cuenta, as: 'cuenta' }]
      });
      res.json(talonarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const talonario = await Talonario.findByPk(req.params.id, {
        include: [{ model: Cuenta, as: 'cuenta' }]
      });
      if (!talonario) return res.status(404).json({ error: 'Talonario no encontrado' });
      res.json(talonario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoTalonario = await Talonario.create(req.body);
      res.status(201).json(nuevoTalonario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const talonario = await Talonario.findByPk(req.params.id);
      if (!talonario) return res.status(404).json({ error: 'Talonario no encontrado' });
      await talonario.update(req.body);
      res.json(talonario);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const talonario = await Talonario.findByPk(req.params.id);
      if (!talonario) return res.status(404).json({ error: 'Talonario no encontrado' });
      await talonario.destroy();
      res.json({ message: 'Talonario eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = TalonarioController;
