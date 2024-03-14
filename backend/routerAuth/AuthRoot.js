const router = require('express').Router();


const login = require('../controlerAuth/authentification.js');
const userController = require('../controlerAuth/userController.js');

router.post('/login', login.loginUser);
router.post('/registerMan', userController.createUser);
router.post('/registerAnim', userController.createAnimateur)
router.post('/pass', login.checkPass);

module.exports = router;