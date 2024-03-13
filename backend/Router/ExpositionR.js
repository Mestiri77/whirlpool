const express = require('express');
const router = express.Router();
const expositionController = require('../controllers/ExpoC');

// Routes pour les expositions
router.post('/expositions', expositionController.createExposition);
router.get('/expositions', expositionController.getAllExpositions);
router.get('/expositions/:id', expositionController.getExpositionById);
router.put('/expositions/:id', expositionController.updateExposition);
router.delete('/expositions/:id', expositionController.deleteExposition);

module.exports = router;
