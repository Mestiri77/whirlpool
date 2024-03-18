const Users = require('../models/Users.js');

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

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getrolbyid
};
