const ReferencehasSellout = require('../models/Ref-Sel');

// Create
async function createReference_has_Sellout(req, res) {
  try {
    const reference_has_sellout = await ReferencehasSellout.create(req.body);
    res.status(201).json(reference_has_sellout);
  } catch (error) {
    console.error('Error creating ReferencehasSellout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllReferencehasSellouts(req, res) {
  try {
    const reference_has_sellouts = await ReferencehasSellout.findAll();
    res.status(200).json(reference_has_sellouts);
  } catch (error) {
    console.error('Error getting Reference_has_Sellouts:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Read one
async function getReference_has_SelloutById(req, res) {
  try {
    const { Reference_idReference, Sellout_idSellout } = req.params;
    const reference_has_sellout = await ReferencehasSellout.findOne({
      where: { Reference_idReference, Sellout_idSellout }
    });
    if (!reference_has_sellout) {
      return res.status(404).json({ message: 'ReferencehasSellout not found' });
    }
    res.status(200).json(reference_has_sellout);
  } catch (error) {
    console.error('Error getting ReferencehasSellout by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deleteReference_has_Sellout(req, res) {
  try {
    const { Reference_idReference, Sellout_idSellout } = req.params;
    const reference_has_sellout = await ReferencehasSellout.findOne({
      where: { Reference_idReference, Sellout_idSellout }
    });
    if (!reference_has_sellout) {
      return res.status(404).json({ message: 'ReferencehasSellout not found' });
    }
    await reference_has_sellout.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting ReferencehasSellout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createReference_has_Sellout,
  getAllReferencehasSellouts,
  getReference_has_SelloutById,
  deleteReference_has_Sellout
};
