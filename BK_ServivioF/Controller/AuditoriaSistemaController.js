const { AuditoriaSistema, Empleado } = require('../Models');

const AuditoriaSistemaController = {
  getAll: async (req, res) => {
    try {
      const auditorias = await AuditoriaSistema.findAll({
        include: [{ model: Empleado, as: 'empleado' }]
      });
      res.json(auditorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const auditoria = await AuditoriaSistema.findByPk(req.params.id, {
        include: [{ model: Empleado, as: 'empleado' }]
      });
      if (!auditoria) return res.status(404).json({ error: 'Auditoría no encontrada' });
      res.json(auditoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaAuditoria = await AuditoriaSistema.create(req.body);
      res.status(201).json(nuevaAuditoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const auditoria = await AuditoriaSistema.findByPk(req.params.id);
      if (!auditoria) return res.status(404).json({ error: 'Auditoría no encontrada' });
      await auditoria.update(req.body);
      res.json(auditoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const auditoria = await AuditoriaSistema.findByPk(req.params.id);
      if (!auditoria) return res.status(404).json({ error: 'Auditoría no encontrada' });
      await auditoria.destroy();
      res.json({ message: 'Auditoría eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = AuditoriaSistemaController;
