const express = require('express');
const userController = require("../controllers/userController");
const router = express.Router();

/* GET user page. */ 
router.get('/', userController.vistaLogin); 
router.get('/register', userController.vistaRegister); 
router.get('/instructors', userController.vistaInstructors);

module.exports = router;