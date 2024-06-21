const Sellout = require('../models/Sellout.js');
const Reference_has_Sellout=require('../models/Ref-Sel.js')
const Sequelize = require('../config/config.js');
const Article = require('./ArticleC.js')
const Exposition = require ('./ExpoC.js')
const Refference = require ('./RefC.js')
const Pdv = require ('./PdvC.js')

// Create
async function createSellout(req, res) {
  try {
    const {dateCr , nbrV}=req.body
    const sellout = await Sellout.create({dateCr , nbrV})
    res.status(201).json(sellout)
  } catch (error) {
    await transaction.rollback();
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
async function getlastone(req,res){
  try {
    const sellouts = await Sellout.findAll({  order: [['createdAt', 'DESC']]}
    );
    res.status(200).json(sellouts);
  }
  catch (error) {
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
    const { nbrV } = req.body;
    const sellout = await Sellout.findByPk(id);
    if (!sellout) {
      return res.status(404).json({ message: 'Sellout not found' });
    }
    await sellout.update({ nbrV:nbrV });
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
// get sellout rapport 
async function getSellout(req, res) {
  try {
    const results = await Sellout.findAll({
      include: [
        {
          model: Refference,
          include: [
            {
              model: Article,
              include: [
                {
                  model: Exposition,
                  where: {
                    idpdv: Sequelize.col('Sellout.idpdv') // Join condition for exposition
                  }
                }
              ]
            }
          ]
        },
        {
          model: Pdv,
          where: {
            name: req.body.pdvname // Filter by pdv name
          }
        }
      ],
      where: {
        dateCr: {
          [Sequelize.Op.between]: [req.body.dateCr, req.body.dateCr] // Filter by date range
        }
      }
    });
    console.log(results);
    res.json(results); // Assuming you're sending JSON response
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Sending error response
  }
}


module.exports = {
  getSellout,
  createSellout,
  getAllSellouts,
  getSelloutById,
  updateSellout,
  deleteSellout,
  getlastone
};
