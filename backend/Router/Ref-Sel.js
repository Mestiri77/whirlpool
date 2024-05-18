const express = require('express');
const router = express.Router();
const referenceselController = require('../controllers/Ref-SelC');

router.get('/ReferenceSel',referenceselController.getAllReferencehasSellouts)

module.exports = router;