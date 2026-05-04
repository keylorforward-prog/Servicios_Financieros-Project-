const { TipoCuenta } = require('../Models');

const TipoCuentaController = {
  getAll: async (req, res) => {
    try {
      const tiposCuenta = await TipoCuenta.findAll();
      res.json(tiposCuenta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const tipoCuenta = await TipoCuenta.findByPk(req.params.id);
      if (!tipoCuenta) return res.status(404).json({ error: 'Tipo de cuenta no encontrado' });
      res.json(tipoCuenta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoTipoCuenta = await TipoCuenta.create(req.body);
      res.status(201).json(nuevoTipoCuenta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const tipoCuenta = await TipoCuenta.findByPk(req.params.id);
      if (!tipoCuenta) return res.status(404).json({ error: 'Tipo de cuenta no encontrado' });
      await tipoCuenta.update(req.body);
      res.json(tipoCuenta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const tipoCuenta = await TipoCuenta.findByPk(req.params.id);
      if (!tipoCuenta) return res.status(404).json({ error: 'Tipo de cuenta no encontrado' });
      await tipoCuenta.destroy();
      res.json({ message: 'Tipo de cuenta eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = TipoCuentaController;
