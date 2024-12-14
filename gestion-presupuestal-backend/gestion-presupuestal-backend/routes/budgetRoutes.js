const express = require('express');
const {
  createBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} = require('../controllers/budgetController');
const router = express.Router();

// Budget routes
router.post('/create', createBudget);
router.get('/', getBudgets);
router.put('/:id', updateBudget);
router.delete('/:id', deleteBudget);

module.exports = router;
