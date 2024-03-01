const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { getExpense } = require('../controllers/expenseController');
// GET
router.get('/', expenseController.getAll);
// GET BY YEAR
router.get('/:year', expenseController.getByYear);
// GET BY DATE
router.get('/:year/:month', expenseController.getByDate);
// GET ONE
router.get('/:id', getExpense, expenseController.getOne);
// POST
router.post('/', expenseController.addOne);
// PUT
router.put('/:id', getExpense, expenseController.updateOne);
// DELETE
router.delete('/:id', getExpense, expenseController.deleteOne);
// DELETE MANY
router.delete('/', expenseController.deleteMany);
// SWAP OPERATIONS
router.post('/swap', expenseController.swap);

module.exports = router;