const Article = require('../models/Article.js');
const Category=require('../models/Category.js')
const Reference=require('../models/Reference.js')
const Marque = require('../models/Marque.js'); // Adjust the path as needed
const PriceM =require ('../models/PriceM.js')
const PDV = require ('../models/Pdv.js')
const Exposition =require('../models/Exposition.js');
const { where } = require('sequelize');


// Create
async function createArticle(req, res) {
  try {
    const article = await Article.create( req.body );
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
// Get one by couleur & capcite
async function getArticleByCouleurAndCapcite(req, res) {
  try {
    const { id } = req.params;
    const { couleur, capacite} = req.body;
    const article = await Article.findOne({where:{
      coloeur: couleur,
      capacite: capacite,
      Reference_idReference:id
    }})
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
      }
      res.status(200).json(article);
  } catch (error) {
    console.error('Error getting article by couleur & capacite:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
// Get one by ref
async function getArticleByrefId(req, res) {
  try {
    const { id } = req.params;
    const article = await Article.findOne({where:{Reference_idReference:id} });
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
    const { coloeur, typeC, capacite, prix } = req.body;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    await article.update({ coloeur, typeC, capacite, prix });
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
const getArticlesByCategory = async (req, res) => {
  try {
    // Extraire le nom de la catégorie des paramètres de la requête
    const { categoryName } = req.params;

    // Récupérer les articles avec les références et les catégories associées
    const articles = await Article.findAll({
      include: {
        model: Reference,
        include: {
          model: Category,
          where: {
            Categoryname: categoryName,
          },
        },
      },
    });

    // Renvoyer les articles en tant que réponse JSON
    return res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);

    // Renvoyer une réponse d'erreur
    return res.status(500).json({ error: 'An error occurred while fetching articles' });
  }
};
const getArticleDetails = async (req, res) => {
  try {
    const { categoryname, pdvname,dateC} = req.params;

    if (!dateC || !categoryname || !pdvname) {
      return res.status(400).json({ message: "Les paramètres 'dateC', 'categoryname' et 'pdvname' sont requis" });
    }

    // Trouver la catégorie
    const categoryData = await Category.findOne({ where: { Categoryname: categoryname } });
    if (!categoryData) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    // Trouver le point de vente
    const pdvData = await PDV.findOne({ where: { pdvname: pdvname } });
    if (!pdvData) {
      return res.status(404).json({ message: "Point de vente non trouvé" });
    }

    // Récupérer les articles avec leurs références, marques, et expositions, filtrés par la catégorie, le point de vente et la date via PriceM
    const articles = await Article.findAll({
      include: [
        {
          model: Reference,
          include: [
            { model: Marque },
            {
              model: Category,
              where: { idCategory: categoryData.idCategory }
            }
          ]
        },
        {
          model: Exposition,
          required: true,
          where: {
            PDV_idPDV: pdvData.idPDV,
          },
          include: [
            {
              model: PDV,
              where: {
                idPDV: pdvData.idPDV
              }
            }
          ]
        },
        {
          model: PriceM,
          where: {
            dateC: dateC,
            PDV_idPDV: pdvData.idPDV
          }
        }
      ]
    });

    if (!articles || articles.length === 0) {
      return res.status(404).json({ message: "Aucun article trouvé pour les critères spécifiés" });
    }

    // Formater les résultats
    const formattedArticles = articles.map(article => ({
      price: article.prix,
      capacity: article.capacite,
      reference: {
        id: article.Reference.idReference,
        name: article.Reference.Referencename,
        marque: {
          id: article.Reference.Marque.idMarque,
          name: article.Reference.Marque.marquename
        }
      }
    }));

    res.status(200).json(formattedArticles);
  } catch (error) {
    console.error("Erreur lors de la récupération des détails des articles :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des détails des articles" });
  }
};

const GettingArticlebyCU = async (req, res) => {
  try {
    const couleur = req.body.couleur; // Assuming the request body still uses 'couleur'
    const unite = req.body.unite;
    const response = await Article.findAll({ where: { coloeur: couleur, typeC: unite } });
    res.status(200).json(response);
  } catch (error) {
    console.error('Error getting article by couleur and unite:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
async function getAllColors(req, res) {
  try {
    const colors = await Article.findAll();
    res.status(200).json(colors.map(color => color.coloeur));
  } catch (error) {
    console.error('Error getting colors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getArticleByrefId,
  getArticlesByCategory,
  getArticleDetails,
  GettingArticlebyCU,
  getArticleByCouleurAndCapcite,
  getAllColors
};
