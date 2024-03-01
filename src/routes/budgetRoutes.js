const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { getBudget } = require('../controllers/budgetController');

// GET
router.get('/', budgetController.getAll);
// GETBYYEAR
router.get('/:year', budgetController.getByYear);
// PUT
router.put('/:id', getBudget, budgetController.updateOne);
// POST
router.post('/', budgetController.addOne);
// DELETE
router.delete('/:id', getBudget, budgetController.deleteOne);

module.exports = router;