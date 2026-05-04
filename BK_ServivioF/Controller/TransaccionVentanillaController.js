const { TransaccionVentanilla, Cuenta, Empleado, Sucursal } = require('../Models');

const TransaccionVentanillaController = {
  getAll: async (req, res) => {
    try {
      const transacciones = await TransaccionVentanilla.findAll({
        include: [
          { model: Cuenta, as: 'cuenta' },
          { model: Empleado, as: 'empleado' },
          { model: Sucursal, as: 'sucursal' }
        ]
      });
      res.json(transacciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const transaccion = await TransaccionVentanilla.findByPk(req.params.id, {
        include: [
          { model: Cuenta, as: 'cuenta' },
          { model: Empleado, as: 'empleado' },
          { model: Sucursal, as: 'sucursal' }
        ]
      });
      if (!transaccion) return res.status(404).json({ error: 'Transacción no encontrada' });
      res.json(transaccion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaTransaccion = await TransaccionVentanilla.create(req.body);
      res.status(201).json(nuevaTransaccion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const transaccion = await TransaccionVentanilla.findByPk(req.params.id);
      if (!transaccion) return res.status(404).json({ error: 'Transacción no encontrada' });
      await transaccion.update(req.body);
      res.json(transaccion);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const transaccion = await TransaccionVentanilla.findByPk(req.params.id);
      if (!transaccion) return res.status(404).json({ error: 'Transacción no encontrada' });
      await transaccion.destroy();
      res.json({ message: 'Transacción eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = TransaccionVentanillaController;
