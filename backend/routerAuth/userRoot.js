const express = require('express');
const router = express.Router();

const userController = require('../controlerAuth/userController.js');

router.get('/',userController.getAllUsers)
router.get('/animateur',userController.getAllAnimateur)
router.get('/manager',userController.getAllmanager)
router.get('/:id',userController.getUserById)
router.get('/name/:id',userController.getnamebyid)
router.get('/one/:id',userController.getonebyid)
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);
router.post('/creat',userController.createUser)


module.exports = router;