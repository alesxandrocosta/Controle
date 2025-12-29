const express = require('express');
const router = express.Router();
const Pagamento = require('../models/Pagamento');

// Search pagamentos (must come before /:id route)
router.get('/search/filter', (req, res) => {
  Pagamento.search(req.query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get all pagamentos
router.get('/', (req, res) => {
  Pagamento.getAll((err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get pagamento by ID
router.get('/:id', (req, res) => {
  Pagamento.getById(req.params.id, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Pagamento não encontrado' });
    }
    res.json(row);
  });
});

// Create new pagamento
router.post('/', (req, res) => {
  Pagamento.create(req.body, (err, id) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, message: 'Pagamento criado com sucesso' });
  });
});

// Update pagamento
router.put('/:id', (req, res) => {
  Pagamento.update(req.params.id, req.body, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (changes === 0) {
      return res.status(404).json({ error: 'Pagamento não encontrado' });
    }
    res.json({ message: 'Pagamento atualizado com sucesso' });
  });
});

// Delete pagamento
router.delete('/:id', (req, res) => {
  Pagamento.delete(req.params.id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (changes === 0) {
      return res.status(404).json({ error: 'Pagamento não encontrado' });
    }
    res.json({ message: 'Pagamento excluído com sucesso' });
  });
});

module.exports = router;
