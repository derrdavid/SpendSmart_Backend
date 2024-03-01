const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { getCategory } = require('../controllers/categoryController');

// GET
router.get('/', categoryController.getAll);
// GET BY ID
router.get('/:id', getCategory, categoryController.getOne);
// PUT
router.put('/:id', getCategory, categoryController.updateOne);
// POST
router.post('/', categoryController.addOne);
// DELETE
router.delete('/:id', getCategory, categoryController.deleteOne);

module.exports = router;
