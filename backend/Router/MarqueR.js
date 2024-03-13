const express = require('express');
const router = express.Router();
const marqueController = require('../controllers/MarqueC');

// Routes pour les marques
router.post('/marques', marqueController.createMarque);
router.get('/marques', marqueController.getAllMarques);
router.get('/marques/:id', marqueController.getMarqueById);
router.put('/marques/:id', marqueController.updateMarque);
router.delete('/marques/:id', marqueController.deleteMarque);

module.exports = router;
