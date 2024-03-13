const PriceM = require('../models/PriceM.js');

// Create
async function createPriceM(req, res) {
  try {
    const { dateC } = req.body;
    const priceM = await PriceM.create({ dateC });
    res.status(201).json(priceM);
  } catch (error) {
    console.error('Error creating PriceM:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllPriceMs(req, res) {
  try {
    const priceMs = await PriceM.findAll();
    res.status(200).json(priceMs);
  } catch (error) {
    console.error('Error getting PriceMs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read one
async function getPriceMById(req, res) {
  try {
    const { id } = req.params;
    const priceM = await PriceM.findByPk(id);
    if (!priceM) {
      return res.status(404).json({ message: 'PriceM not found' });
    }
    res.status(200).json(priceM);
  } catch (error) {
    console.error('Error getting PriceM by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updatePriceM(req, res) {
  try {
    const { id } = req.params;
    const { dateC } = req.body;
    const priceM = await PriceM.findByPk(id);
    if (!priceM) {
      return res.status(404).json({ message: 'PriceM not found' });
    }
    await priceM.update({ dateC });
    res.status(200).json(priceM);
  } catch (error) {
    console.error('Error updating PriceM:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deletePriceM(req, res) {
  try {
    const { id } = req.params;
    const priceM = await PriceM.findByPk(id);
    if (!priceM) {
      return res.status(404).json({ message: 'PriceM not found' });
    }
    await priceM.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting PriceM:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createPriceM,
  getAllPriceMs,
  getPriceMById,
  updatePriceM,
  deletePriceM
};
