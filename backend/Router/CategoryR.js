const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryC');

// Routes pour les catégories
router.post('/categories', categoryController.createCategory);
router.get('/categorie', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
