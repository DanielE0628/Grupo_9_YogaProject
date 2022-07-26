const express = require('express');
const mainController = require("../controllers/mainController");
const userController = require("../controllers/userController");
const productsController = require("../controllers/productsController");

const router = express.Router();

/* GET home page. */
router.get('/', mainController.vistaHome);

router.get('/productos', productsController.vistaProductos); 
router.get('/detalleProductos', productsController.detallesProductos);

router.get('/login', userController.vistaLogin); 
router.get('/register', userController.vistaRegister); 
router.get('/instructors', userController.vistaInstructors);

module.exports = router;