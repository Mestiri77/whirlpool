const express = require('express');
const router = express.Router();
const presenceController = require('../controllers/PresC');

// Routes pour les présences
router.post('/presences', presenceController.createPresence);
router.get('/presences', presenceController.getAllPresences);
router.get('/presences/:id', presenceController.getPresenceById);
router.put('/presences/:id', presenceController.updatePresence);
router.delete('/presences/:id', presenceController.deletePresence);

module.exports = router;
