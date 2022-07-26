const express = require('express');
const mainController = require("../controllers/main");
const router = express.Router();

/* GET home page. */
router.get('/', mainController.vistaHome); 
router.get('/productos', mainController.productos); 
router.get('/detalle-productos', mainController.detallesProductos); 
router.get('/login', mainController.login); 
router.get('/register', mainController.register); 
router.get('/instructores', mainController.instuctores); 


module.exports = router;

