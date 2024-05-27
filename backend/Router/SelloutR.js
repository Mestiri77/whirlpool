const express = require('express');
const router = express.Router();
const selloutController = require('../controllers/SelloutC');

// Routes pour les ventes
router.post('/sellouts', selloutController.createSellout);
router.get('/sellouts', selloutController.getAllSellouts);
router.get('/sellouts/:id', selloutController.getSelloutById);
router.put('/sellouts/:id', selloutController.updateSellout);
router.delete('/sellouts/:id', selloutController.deleteSellout);
router.get ('/findsellou/:pdvname/:dateCr',selloutController.getSellout)// get raport sellout

module.exports = router;
