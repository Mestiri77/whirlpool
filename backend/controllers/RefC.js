const Reference = require('../models/Reference.js');
const Marque = require ('../models/Marque.js')
const Category=require('../models/Category.js')

// Create
async function createReference(req, res) {
  try {
    const {Referencename,Marque_idMarque,Category_idCategory}=req.body;
    const reference = await Reference.create({Referencename,Marque_idMarque,Category_idCategory});
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
async function getrefbyname(req, res) {
  try {
    const { Referencename } = req.params;
    const reference = await Reference.findOne({ name: Referencename });

    // Always return a 404 if no reference is found
    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }

    // Return the reference if found
    res.status(200).json(reference);
  } catch (error) {
    console.error('Error getting Reference by name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updateReference(req, res) {
  try {
    const { id } = req.params;
    const reference = await Reference.findByPk(id);
    if (!reference) {
      return res.status(404).json({ message: 'Reference not found' });
    }
    await reference.update(req.body);
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
//////////////////////////////////
const getidmarque = async (req, res) => {
    const name = req.body;

    try {
        const reference = await Reference.findOne({
            include: [{
                model: Marque,
                where: { marquename: name }
            }]
        });

        if (!reference) {
            res.status(404).json({ message: 'No reference found for the given marque name' });
            return;
        }

        const idMarque = reference.idMarque; // Supposons que l'ID de la marque soit stocké dans une colonne 'id' du modèle Marque
        res.status(200).json({ idMarque });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getidcategory = async (req, res) => {
    const name = req.body;
    try {
        const reference = await Reference.findOne({
            include: [{
                model: Category,
                where: { Categoryname: name }
            }]
        });

        if (!reference) {
            res.status(404).json({ message: 'No reference found for the given marque name' });
            return;
        }

        const idCategory = reference.idCategory; // Supposons que l'ID de la marque soit stocké dans une colonne 'id' du modèle Marque
        res.status(200).json({ idCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const RefbyCateg = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de la catégorie depuis les paramètres de la requête

  try {
    const references = await Reference.findAll({
      where: {
        Category_idCategory: id,
      },
    });
    res.status(200).json(references);
  } catch (error) {
    console.error('Error fetching references:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getMCref = async (req, res) => {
  const idMarque = req.body.Marque_idMarque;
  const idCategory = req.body.Category_idCategory;
  try {
    const reference = await Reference.findAll({
      where: {
        Marque_idMarque: idMarque,
        Category_idCategory: idCategory
      }
    });
    res.status(200).json(reference);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createReference,
  getAllReferences,
  getReferenceById,
  updateReference,
  deleteReference,
  getidcategory,
  getidmarque,
  RefbyCateg,
  getrefbyname
};
