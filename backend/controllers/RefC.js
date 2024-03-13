const Reference = require('../models/Reference.js');

// Create
async function createReference(req, res) {
  try {
    const { Referencename } = req.body;
    const reference = await Reference.create({ Referencename });
    res.status(201).json(reference);
  } catch (error) {
    console.error('Error creating Reference:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllReferences(req, res) {
  try {
    const references = await Reference.findAll();
    res.status(200).json(references);
  } catch (error) {
    console.error('Error getting References:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read one
async function getReferenceById(req, res) {
  try {
    const { id } = req.params;
    const reference = await Reference.findByPk(id);
    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }
    res.status(200).json(reference);
  } catch (error) {
    console.error('Error getting Reference by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updateReference(req, res) {
  try {
    const { id } = req.params;
    const { Referencename } = req.body;
    const reference = await Reference.findByPk(id);
    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }
    await reference.update({ Referencename });
    res.status(200).json(reference);
  } catch (error) {
    console.error('Error updating Reference:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deleteReference(req, res) {
  try {
    const { id } = req.params;
    const reference = await Reference.findByPk(id);
    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }
    await reference.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting Reference:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createReference,
  getAllReferences,
  getReferenceById,
  updateReference,
  deleteReference
};
