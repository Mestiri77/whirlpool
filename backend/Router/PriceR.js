const express = require('express');
const router = express.Router();
const priceMController = require('../controllers/PriceC');

// Routes pour PriceM
router.post('/priceMs', priceMController.createPriceM);
router.get('/priceMs', priceMController.getAllPriceMs);
router.get('/priceMs/:id', priceMController.getPriceMById);
router.put('/priceMs/:id', priceMController.updatePriceM);
router.delete('/priceMs/:id', priceMController.deletePriceM);
router.get ('/getCategori/:Pdvname/:dateC',priceMController.findCategoriePriceMps) // get all category 
router.get('/getpricemap/:categoryname',priceMController,priceMController.findpricemap)//get price map


module.exports = router;
