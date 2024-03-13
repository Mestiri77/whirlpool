const Marque = require('../models/Marque.js');

// Create
async function createMarque(req, res) {
  try {
    const { marquename } = req.body;
    const marque = await Marque.create({ marquename });
    res.status(201).json(marque);
  } catch (error) {
    console.error('Error creating marque:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllMarques(req, res) {
  try {
    const marques = await Marque.findAll();
    res.status(200).json(marques);
  } catch (error) {
    console.error('Error getting marques:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read one
async function getMarqueById(req, res) {
  try {
    const { id } = req.params;
    const marque = await Marque.findByPk(id);
    if (!marque) {
      return res.status(404).json({ message: 'Marque not found' });
    }
    res.status(200).json(marque);
  } catch (error) {
    console.error('Error getting marque by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updateMarque(req, res) {
  try {
    const { id } = req.params;
    const { marquename } = req.body;
    const marque = await Marque.findByPk(id);
    if (!marque) {
      return res.status(404).json({ message: 'Marque not found' });
    }
    await marque.update({ marquename });
    res.status(200).json(marque);
  } catch (error) {
    console.error('Error updating marque:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deleteMarque(req, res) {
  try {
    const { id } = req.params;
    const marque = await Marque.findByPk(id);
    if (!marque) {
      return res.status(404).json({ message: 'Marque not found' });
    }
    await marque.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting marque:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createMarque,
  getAllMarques,
  getMarqueById,
  updateMarque,
  deleteMarque
};
