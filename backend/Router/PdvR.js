const express = require('express');
const router = express.Router();
const pdvController = require('../controllers/PdvC');

// Routes pour les points de vente (PDV)
router.post('/pdvs', pdvController.createPDV);
router.get('/pdvs', pdvController.getAllPDVs);
router.get('/pdvs/:id', pdvController.getPDVById);
router.put('/pdvs/:id', pdvController.updatePDV);
router.delete('/pdvs/:id', pdvController.deletePDV);

module.exports = router;
