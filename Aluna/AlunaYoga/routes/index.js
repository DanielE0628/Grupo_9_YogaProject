var express = require('express');
var router = express.Router();
const mainController = require("../controllers/main");

/* GET home page. */
router.get('/', mainController.home); 
router.get('/productos', mainController.productos); 
router.get('/detalle-productos', mainController.detalleProductos); 
router.get('/login', mainController.login); 
router.get('/register', mainController.register); 


module.exports = router;

