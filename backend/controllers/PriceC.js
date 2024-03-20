const PriceM = require('../models/PriceM.js');
const Categorie =require ('./CategoryC.js')
const Pdv = require ('./PdvC.js')
const Article = require ('./ArticleC.js')

// Create
async function createPriceM(req, res) {
  try {
    // const { dateC,PDV_idPDV} = req.body;
    const priceM = await PriceM.create(req.body);
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
// // Assuming this code is within an asynchronous function
// async function findPriceMps(req, res) {
//   try {
//     const pdvId = await priceM.findAll({
//       include: [{
//         model: pricem_category,
//         where: {
//           dateC: req.params.date // Assuming req.params.date contains the date parameter
//         },
//         include: [{
//           model: pdv
//         }]
//       }]
//     });

//     console.log(pdvId);
//     res.status(200).json(pdvId); // Sending the result back as JSON response
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Internal Server Error' }); // Sending error response
//   }
// }


async function findCategoriePriceMps(req, res) {
  try {
    const priceM = await PriceM.findAll({
      include: [
        {
          model: Categorie,
          through: { model: pricem_categories },
        },
        {
          model: Pdv,
          where: { pdvname: req.params.pdvname },
        }
      ],
      where: { date: req.params.dateC }
    });
    
    res.status(200).json(priceM);
  } catch(err) {
    console.error('Erreur lors de la récupération des données :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
  }
}
async function findpricemap (req,res){
  try {
  const articles = await Article.findAll({
    include: [
      {
        model: Reference,
        include: [
          {
            model: Category,
            where: {
              name: req.params.categoryname 
              
            }
          }
        ]
      },
      {
        model: PricemCategory,
        include: [
          {
            model: Pricem,
            include: [
              {
                model: Pdv
              }
            ]
          }
        ]
      }
    ]
  });

  // Handle the results
  res.status(200).json(articles);
} catch (error) {
  // Handle any errors that occur during the Sequelize query
  res.status(500).json('Error occurred:', error);
}}

module.exports = {
  findpricemap,
  findCategoriePriceMps,
  createPriceM,
  getAllPriceMs,
  getPriceMById,
  updatePriceM,
  deletePriceM
};