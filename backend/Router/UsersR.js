const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UsersC');

// Routes pour les utilisateurs
router.post('/users', usersController.createUser);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);
router.get('/user/role/:id',usersController.getrolbyid)
router.get ('/user/:pdvName',usersController.getUsersByPDVName);

module.exports = router;
