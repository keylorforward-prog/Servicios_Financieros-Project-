const { Cuenta, Cliente, Sucursal, TipoCuenta } = require('../Models');

const CuentaController = {
  getAll: async (req, res) => {
    try {
      const cuentas = await Cuenta.findAll({
        include: [
          { model: Cliente, as: 'cliente' },
          { model: Sucursal, as: 'sucursal_apertura' },
          { model: TipoCuenta, as: 'tipo_cuenta' }
        ]
      });
      res.json(cuentas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const cuenta = await Cuenta.findByPk(req.params.id, {
        include: [
          { model: Cliente, as: 'cliente' },
          { model: Sucursal, as: 'sucursal_apertura' },
          { model: TipoCuenta, as: 'tipo_cuenta' }
        ]
      });
      if (!cuenta) return res.status(404).json({ error: 'Cuenta no encontrada' });
      res.json(cuenta);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaCuenta = await Cuenta.create(req.body);
      res.status(201).json(nuevaCuenta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const cuenta = await Cuenta.findByPk(req.params.id);
      if (!cuenta) return res.status(404).json({ error: 'Cuenta no encontrada' });
      await cuenta.update(req.body);
      res.json(cuenta);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const cuenta = await Cuenta.findByPk(req.params.id);
      if (!cuenta) return res.status(404).json({ error: 'Cuenta no encontrada' });
      await cuenta.destroy();
      res.json({ message: 'Cuenta eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = CuentaController;
