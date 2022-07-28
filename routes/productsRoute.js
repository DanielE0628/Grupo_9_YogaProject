const express = require('express');
const productsController = require("../controllers/productsController");
const router = express.Router();
 
router.get('/', productsController.vistaProductos); 
router.get('/detail', productsController.detallesProductos); 

module.exports = router;