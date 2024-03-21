const Exposition = require('../models/Exposition.js');
const Sequelize = require('sequelize');
const Article =require ('./ArticleC.js')
const Reference = require ('./RefC.js')
const Marque = require ('./MarqueC.js')

// Create
async function createExposition(req, res) {
  try {
    const exposition = await Exposition.create(req.body);
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
//get categorie by pdvname and date creation
async function getexpo(req,res) {
  try {
    const data = await Category.findAll({
      include: [
        {
          model: User,
          include: [
            {
              model: PDV,
              where: { pdvname: req.params.pdvname },
              include: [
                {
                  model: Exposition,
                  where: { dateCr: req.params.dateCr },
                  include: [
                    {
                      model: Article,
                      include: [
                        {
                          model: Reference,
                          required: true // INNER JOIN with reference
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });
   res.status(200).json(data)
  } catch (error) {
    console.error('Error:', error);
  }
}
// get countity of whirlpool article 
async function WhirlpoolCount (req,res){
  try {
   const whirl= await Article.findAndCountAll({
      include: [
        {
          model: Reference,
          include: [
            {
              model: Marque,
              where: { marquename: 'Whirlpool' } // Filtrer les marques avec le nom "Whirlpool"
            }
          ]
        },
        {
          model: Exposition,
          include: [
            {
              model: Pdv
            }
          ]
        }
      ]
    })

    res.status(200).json("Nombre d'articles Whirlpool exposés dans les points de vente:", whirl);
    } catch(err) {
    console.error('Erreur lors de la recherche:', err);
  };
}

async function getOtherMarque (req,res){
  try {
  const  other= await marque.count({
      include: [
        {
          model: Reference,
          include: [
            {
              model: Article,
              include: [
                {
                  model: Exposition,
                  include: [
                    {
                      model: pdv
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      where: {
        marquename: {
          [Sequelize.Op.ne]: 'Whirlpool' // Op.ne représente l'opérateur de non égalité
        }
      }
    })
      res.status(200).json('Les autre marque est ', other);
    }catch(err) {
      console.error('Erreur lors du comptage des enregistrements:', err);
    }
  }


async function getother (req, res) {
      try {
          const result = await Article.findAll({
              attributes: [
                  [sequelize.col('marque.marquename'), 'marque'],
                  [sequelize.col('refference.refferencename'), 'refference'],
                  [sequelize.col('article.prix'), 'article'],
                  [sequelize.col('category.categoryname'), 'category']
              ],
              include: [
                  {
                      model: Refference,
                      attributes: [],
                      include: [
                          {
                              model: Marque,
                              attributes: [],
                              where: { namemarque: { [sequelize.Op.not]: 'whirlpool' }, idmarque: sequelize.col('refference.idmarque') }
                          },
                          {
                              model: Category,
                              attributes: [],
                              where: { idcategory: sequelize.col('refference.idcategory'), namecategory: req.params.namecategory }
                          }
                      ]
                  }
              ]
          });
          res.json(result);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
      }
  };

 async function whirlpool (req, res){
    try {
        const result = await Article.findAll({
            attributes: [
                [sequelize.col('marque.marquename'), 'marque'],
                [sequelize.col('refference.refferencename'), 'refference'],
                [sequelize.col('article.prix'), 'article'],
                [sequelize.col('category.categoryname'), 'category']
            ],
            include: [
                {
                    model: Refference,
                    include: [
                        {
                            model: Marque,
                            where: { marquename: 'whirlpool' }
                        },
                        {
                            model: Category,
                            where: { categoryname: req.params.categoryname }
                        }
                    ]
                }
            ]
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = {
  whirlpool,
  getother,
  getOtherMarque,
  WhirlpoolCount,
  getexpo,
  createExposition,
  getAllExpositions,
  getExpositionById,
  updateExposition,
  deleteExposition
};
