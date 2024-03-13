const Exposition = require('../models/Exposition.js');

// Create
async function createExposition(req, res) {
  try {
    const { dateCr } = req.body;
    const exposition = await Exposition.create({ dateCr });
    res.status(201).json(exposition);
  } catch (error) {
    console.error('Error creating exposition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllExpositions(req, res) {
  try {
    const expositions = await Exposition.findAll();
    res.status(200).json(expositions);
  } catch (error) {
    console.error('Error getting expositions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read one
async function getExpositionById(req, res) {
  try {
    const { id } = req.params;
    const exposition = await Exposition.findByPk(id);
    if (!exposition) {
      return res.status(404).json({ message: 'Exposition not found' });
    }
    res.status(200).json(exposition);
  } catch (error) {
    console.error('Error getting exposition by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updateExposition(req, res) {
  try {
    const { id } = req.params;
    const { dateCr } = req.body;
    const exposition = await Exposition.findByPk(id);
    if (!exposition) {
      return res.status(404).json({ message: 'Exposition not found' });
    }
    await exposition.update({ dateCr });
    res.status(200).json(exposition);
  } catch (error) {
    console.error('Error updating exposition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deleteExposition(req, res) {
  try {
    const { id } = req.params;
    const exposition = await Exposition.findByPk(id);
    if (!exposition) {
      return res.status(404).json({ message: 'Exposition not found' });
    }
    await exposition.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting exposition:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createExposition,
  getAllExpositions,
  getExpositionById,
  updateExposition,
  deleteExposition
};
