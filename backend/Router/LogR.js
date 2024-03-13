const express = require('express');
const router = express.Router();
const logController = require('../controllers/LogC');

// Routes pour les logs
router.post('/logs', logController.createLog);
router.get('/logs', logController.getAllLogs);
router.get('/logs/:id', logController.getLogById);
router.put('/logs/:id', logController.updateLog);
router.delete('/logs/:id', logController.deleteLog);

module.exports = router;
