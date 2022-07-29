const express = require('express');
const productsController = require("../controllers/productsController");
const cartController = require ('../controllers/cartController');
const router = express.Router();
 
router.get('/', productsController.index); 
router.get('/detail', productsController.detail); 
router.get('/product-create', productsController.create); 
router.get('/cart',cartController.cartView ); 

module.exports = router;