
const User  = require('../models/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userr=require('./userController.js')


const generateToken = (userId, userName) => {
  const expiresIn = 60 * 60 * 24 * 7; // 7 day
  return jwt.sign({ userId, userName }, 'secretKey', { expiresIn: expiresIn });
};

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user || user.password !== password) { // You should ideally hash the password
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, 'secretKey', { expiresIn: '1d' });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



const checkPass = async(req, res) => {
  const{email,password}=req.body;
  try {
       const result= await User.findOne({ where :{email:email}})
       if(result ===null) res.send("user not found")
       else {
        const verif=result.dataValues.password
        const passwordMatch = await bcrypt.compare(password,verif)
        if(passwordMatch){
           const token=generateToken(result.dataValues.id,result.dataValues.username)  
           result.dataValues.token=token
          res.send(true)
        }
        else{
          res.send(false)
        }
       }
      }
      catch (error) {res.status(500).json(error)}
  }
  
  

module.exports = {
  loginUser,
  checkPass
}; 

