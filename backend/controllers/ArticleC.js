const Article = require('../models/Article.js');

// Create
async function createArticle(req, res) {
  try {
    const onearticle = req.body;
    const article = await Article.create({ onearticle });
    res.status(201).json(article);
  } catch (error) { 
    console.error('Error creating article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllArticles(req, res) {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error getting articles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read one
async function getArticleById(req, res) {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error('Error getting article by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updateArticle(req, res) {
  try {
    const { id } = req.params;
    const { couleur, typeC, capacite, prix } = req.body;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    await article.update({ couleur, typeC, capacite, prix });
    res.status(200).json(article);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deleteArticle(req, res) {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    await article.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};
