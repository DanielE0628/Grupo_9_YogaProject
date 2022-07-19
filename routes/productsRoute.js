const express = require('express');
const productsController = require("../controllers/productsController");
const router = express.Router();



// router.get('/detalle-productos', productsController.detallesProductos); 
// //detalle prodcutos
// router.get('/products/detalle/:id', productsController.function); 
// //Crear-prodcutos
// router.get('/products/crear', productsController.function); 
router.get('/', productsController.vistaProductos); 
router.get('/detalleProductos', productsController.detallesProductos); 

module.exports = router;