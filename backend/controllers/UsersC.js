const Users =require('../models/Users.js');
const PDV =require ('../models/Pdv.js')
// Create
async function createUser(req, res) {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Read all
async function getAllUsers(req, res) {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

const getrolbyid = async (req,res)=>{
  try{
    const id= req.params.id;
    const user=await Users.findByPk(id)
    res.status(200).json(user.role)
  }
  catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// Read one
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user by id:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Update
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, lastname, email, password, role } = req.body;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update({ name, lastname, email, password, role });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Delete
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await Users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
async function getUsersByPDVName(req, res) {
  const pdvId = req.params.pdvId;

  try {
    // Rechercher le point de vente par ID
    const pdv = await PDV.findByPk(pdvId, {
      include: [{
        model: Users,
        as: 'Users'  // Assurez-vous que l'alias correspond à votre configuration d'association
      }]
    });

    if (!pdv) {
      return res.status(404).json({ message: `Aucun point de vente trouvé avec l'ID ${pdvId}` });
    }

    // Afficher les informations des utilisateurs (animatrices)
    const animatrices = pdv.Users;
    if (animatrices && animatrices.length > 0) {
      return res.status(200).json(animatrices.map(user => ({
        id: user.idusers,
        name: user.name,  // Ajustez les champs selon votre schéma
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        PDV_idPDV:user.PDV_idPDV
      })));
    } else {
      return res.status(404).json({ message: `Aucune animatrice affectée au point de vente avec l'ID ${pdvId}` });
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération des animatrices pour le point de vente avec l'ID ${pdvId}:`, error);
    return res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getrolbyid,
  getUsersByPDVName
};
