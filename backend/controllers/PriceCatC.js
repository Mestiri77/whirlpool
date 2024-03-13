const PriceM_Category = require('../models/Price-Categ.js');

// Create
async function createPriceM_Category(req, res) {
  try {
    const { idPriceM, idCategory } = req.body;
    const priceM_Category = await PriceM_Category.create({ idPriceM, idCategory });
    res.status(201).json(priceM_Category);
  } catch (error) {
    console.error('Error creating PriceM_Category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllPriceM_Categories(req, res) {
  try {
    const priceM_Categories = await PriceM_Category.findAll();
    res.status(200).json(priceM_Categories);
  } catch (error) {
    console.error('Error getting PriceM_Categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read one
async function getPriceM_CategoryById(req, res) {
  try {
    const { id } = req.params;
    const priceM_Category = await PriceM_Category.findByPk(id);
    if (!priceM_Category) {
      return res.status(404).json({ message: 'PriceM_Category not found' });
    }
    res.status(200).json(priceM_Category);
  } catch (error) {
    console.error('Error getting PriceM_Category by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updatePriceM_Category(req, res) {
  try {
    const { id } = req.params;
    const { idPriceM, idCategory } = req.body;
    const priceM_Category = await PriceM_Category.findByPk(id);
    if (!priceM_Category) {
      return res.status(404).json({ message: 'PriceM_Category not found' });
    }
    await priceM_Category.update({ idPriceM, idCategory });
    res.status(200).json(priceM_Category);
  } catch (error) {
    console.error('Error updating PriceM_Category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deletePriceM_Category(req, res) {
  try {
    const { id } = req.params;
    const priceM_Category = await PriceM_Category.findByPk(id);
    if (!priceM_Category) {
      return res.status(404).json({ message: 'PriceM_Category not found' });
    }
    await priceM_Category.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting PriceM_Category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createPriceM_Category,
  getAllPriceM_Categories,
  getPriceM_CategoryById,
  updatePriceM_Category,
  deletePriceM_Category
};
