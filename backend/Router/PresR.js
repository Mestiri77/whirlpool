const express = require('express');
const router = express.Router();
const presenceController = require('../controllers/PresC');

// Routes pour les présences
router.post('/presences', presenceController.createPresence);
router.get('/presences', presenceController.getAllPresences);
router.get ('/pdvName/:pdvname',presenceController.getPresencesByPDVName)
router.get('/presences/:id', presenceController.getPresenceById);
router.post('/presence/latest', presenceController.getLatestPresence);
router.put('/presences/:id', presenceController.updatePresence);
router.delete('/presences/:id', presenceController.deletePresence);
router.put('/presences/:id/checkin', presenceController.addCheckin);
router.put('/presences/checkout/:id', presenceController.addCheckout);
router.put('/presences/:id/pos', presenceController.addPosition);


module.exports = router;
