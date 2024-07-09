const express = require('express');
const router = express.Router();
const referenceController = require('../controllers/RefC');

// Routes pour les références
router.post('/references', referenceController.createReference);
router.get('/references', referenceController.getAllReferences);
router.get('/references/:id', referenceController.getReferenceById);
router.get('/referencess/:Referencename', referenceController.getrefbyname);
router.put('/references/:id', referenceController.updateReference);
router.delete('/references/:id', referenceController.deleteReference);
//////////////////////////
router.get('/reference/cat',referenceController.getidcategory)
router.get('/references/marque',referenceController.getidmarque)
router.get('/referencebycateg/:id',referenceController.RefbyCateg)
router.put('/addObject',referenceController.AddObj)


module.exports = router;
