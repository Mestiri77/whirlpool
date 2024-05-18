const express = require('express');
const router = express.Router();
const pdvController = require('../controllers/PdvC');

router.get('/getId/:pdvname', pdvController.getPDVIdByName);

module.exports = router;
