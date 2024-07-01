const  Reference_has_Sellout  = require('../models/Ref-Sel'); // Assurez-vous que le modèle est correctement importé

// Create
async function createReference_has_Sellout(req, res) {
  try {
    const { Reference_idReference, Sellout_idSellout,Article_idArticle } = req.body;

    // Créez une nouvelle entrée Reference_has_Sellout
    const reference_has_sellout = await Reference_has_Sellout.create({ 
      Reference_idReference:Reference_idReference, 
      Sellout_idSellout:Sellout_idSellout ,
      Article_idArticle:Article_idArticle
    });

    // Réponse avec le nouvel enregistrement créé
    res.status(201).json(reference_has_sellout);
  } catch (error) {
    console.error('Error creating Reference_has_Sellout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllReferencehasSellouts(req, res) {
  try {
    const reference_has_sellouts = await Reference_has_Sellout.findAll();
    res.status(200).json(reference_has_sellouts);
  } catch (error) {
    console.error('Error getting Reference_has_Sellouts:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
async function getRefSelbyidRef(req, res) {
  try {
    const { idRef } = req.params;
    console.log(`Received idRef: ${idRef}`);

    if (!idRef) {
      console.error('idRef parameter is missing or undefined');
      return res.status(400).json({ message: 'idRef parameter is required' });
    }

    const referenceHasSellouts = await Reference_has_Sellout.findAll({
      where: { Reference_idReference: idRef }
    });

    if (referenceHasSellouts.length === 0) {
      return res.status(404).json({ message: 'Reference_has_Sellout not found' });
    }

    res.status(200).json(referenceHasSellouts);
  } catch (error) {
    console.error('Error getting Reference_has_Sellout by id:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Read one
async function getReference_has_SelloutById(req, res) {
  try {
    const { Reference_idReference, Sellout_idSellout } = req.params;
    const reference_has_sellout = await Reference_has_Sellout.findOne({
      where: { Reference_idReference, Sellout_idSellout }
    });
    if (!reference_has_sellout) {
      return res.status(404).json({ message: 'Reference_has_Sellout not found' });
    }
    res.status(200).json(reference_has_sellout);
  } catch (error) {
    console.error('Error getting Reference_has_Sellout by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deleteReference_has_Sellout(req, res) {
  try {
    const { Reference_idReference, Sellout_idSellout } = req.params;
    const reference_has_sellout = await Reference_has_Sellout.findOne({
      where: { Reference_idReference, Sellout_idSellout }
    });
    if (!reference_has_sellout) {
      return res.status(404).json({ message: 'Reference_has_Sellout not found' });
    }
    await reference_has_sellout.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting Reference_has_Sellout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createReference_has_Sellout,
  getAllReferencehasSellouts,
  getReference_has_SelloutById,
  deleteReference_has_Sellout,
  getRefSelbyidRef
};
