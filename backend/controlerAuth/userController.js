
const User  = require('../models/Users.js')
const bcrypt = require('bcrypt')


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
};

const getAllAnimateur = async (req, res) => {
try {
  const users = await User.findAll({where:{role:"animatrice"}});
  res.status(200).json(users);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Error' });
}
};

const getAllmanager = async (req, res) => {
try {
  const users = await User.findAll({where:{role:"manager"}});
  res.status(200).json(users);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Error' });
}
};
const getadmin = async (req, res) => {
  try {
    const users = await User.findAll({where:{role:"admin"}});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
  };

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
};


const createUser = async (req, res) => {
  try {
    const { name,lastname, email, password, role,PDV_idPDV } = req.body;

    console.log('Received registration request:', { name, email, role });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      role,
      PDV_idPDV
    });

    console.log('User created:', newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};
const createAnimateur = async (req, res) => {
    try {
      const { name,lastname, email, password, role,PDV_idPDV } = req.body;
  
      console.log('Received registration request:', { name, email, role });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        lastname,
        email,
        password: hashedPassword,
        role,
        PDV_idPDV
      });
  
      console.log('animateur created:', newUser);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
  };
  const getuserbyname = async (req, res) => {
    const { name, lastname } = req.query;  // Utilisation de req.query pour récupérer les paramètres de l'URL
    
    try {
      const userbyName = await User.findOne({ where: { name, lastname,role:"animatrice" } });
      
      if (userbyName) {
        res.json(userbyName);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user by name:', error);
      res.status(500).json({ error: 'Error fetching user by name' });
    }
  };

const updateAnimByPdv = async (req, res) => {
  let iduser = req.params.id;
  let pdvid = req.body.PDV_idPDV;

  try {
    const user = await User.findByPk(iduser);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role === "animatrice") {
      await user.update({ PDV_idPDV: pdvid });
      return res.status(200).json({ message: 'User updated successfully' });
    } else {
      return res.status(400).json({ error: 'User is not an animatrice' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating user' });
  }
};

const updateUserById = async (req, res) => {
    const userId = req.params.id;
    const { name,lastname, email, password } = req.body;
  
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.name = name;
      user.lastname=lastname,
      user.email = email;
  
      // If a new password is provided, update the password
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error' });
    }
  };
  

const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
};

const getnamebyid = async (req, res) => {
  const userid = req.params.id; // Use req.params.id instead of req.param.id

  try {
    const one = await User.findByPk(userid);
    const name = one.name; // Assuming 'name' is a property of the 'User' model

    // Send the name as a response
    res.status(200).json({ name: name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
};

const getonebyid=async(req,res)=>{
  const userid = req.params.id; // Use req.params.id instead of req.param.id
  try{
    const data=await User.findOne({where:{idusers:userid}})
    res.status(201).json(data)
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
}

module.exports = {
    createAnimateur,
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  getAllAnimateur,
  getAllmanager,
  getnamebyid,
  getonebyid,
  getadmin,
  updateAnimByPdv,
  getuserbyname
};
