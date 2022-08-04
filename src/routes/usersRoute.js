//Require
const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();

//let logDBMiddleware = require('../middlewares/logDBmiddlewares');

/* GET user page. */ 
router.get('/', userController.vistaUser);
router.get('/login', userController.vistaLogin); 
router.get('/register', userController.vistaRegister); 
router.get('/instructors', userController.vistaInstructors);

module.exports = router;