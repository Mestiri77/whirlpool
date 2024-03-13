const Sellout = require('../models/Sellout.js');

// Create
async function createSellout(req, res) {
  try {
    const { dateCr, nbrV, objectif } = req.body;
    const sellout = await Sellout.create({ dateCr, nbrV, objectif });
    res.status(201).json(sellout);
  } catch (error) {
    console.error('Error creating Sellout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllSellouts(req, res) {
  try {
    const sellouts = await Sellout.findAll();
    res.status(200).json(sellouts);
  } catch (error) {
    console.error('Error getting Sellouts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read one
async function getSelloutById(req, res) {
  try {
    const { id } = req.params;
    const sellout = await Sellout.findByPk(id);
    if (!sellout) {
      return res.status(404).json({ message: 'Sellout not found' });
    }
    res.status(200).json(sellout);
  } catch (error) {
    console.error('Error getting Sellout by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updateSellout(req, res) {
  try {
    const { id } = req.params;
    const { dateCr, nbrV, objectif } = req.body;
    const sellout = await Sellout.findByPk(id);
    if (!sellout) {
      return res.status(404).json({ message: 'Sellout not found' });
    }
    await sellout.update({ dateCr, nbrV, objectif });
    res.status(200).json(sellout);
  } catch (error) {
    console.error('Error updating Sellout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deleteSellout(req, res) {
  try {
    const { id } = req.params;
    const sellout = await Sellout.findByPk(id);
    if (!sellout) {
      return res.status(404).json({ message: 'Sellout not found' });
    }
    await sellout.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting Sellout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createSellout,
  getAllSellouts,
  getSelloutById,
  updateSellout,
  deleteSellout
};
