
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
  const users = await User.findAll({where:{role:"animateur"}});
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
    const { name,lastname, email, password, role } = req.body;

    console.log('Received registration request:', { name, email, role });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      lastname,
      email,
      password: hashedPassword,
      role,
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
const getuserbyname=async(req,res)=>{
  let nom=req.body.name
  let prenom=req.body.lastname
  try{
    const userbyName=await User.findOne({where:{name:nom,lastname:prenom}})
    res.json(userbyName)
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Error creating user' });
    }
}
const updateAnimByPdv=async (req,res)=>{
  let iduser=req.params.id
  let  pdvid=req.body.PDV_idPDV
  try {
    const user = await User.findByPk(iduser);
    if(user.role=="animateur"){
      await user.update({PDV_idPDV:pdvid})
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
}

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
