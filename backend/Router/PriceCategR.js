const express = require('express');
const router = express.Router();
const priceMCategoryController = require('../controllers/PriceCatC.js');

// Routes pour PriceM_Category
router.post('/priceM_categories', priceMCategoryController.createPriceM_Category);
router.get('/priceM_categories', priceMCategoryController.getAllPriceM_Categories);
router.get('/priceM_categories/:id', priceMCategoryController.getPriceM_CategoryById);
router.put('/priceM_categories/:id', priceMCategoryController.updatePriceM_Category);
router.delete('/priceM_categories/:id', priceMCategoryController.deletePriceM_Category);

module.exports = router;
