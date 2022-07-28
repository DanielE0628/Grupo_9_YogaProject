const express = require('express');
const cartController = require("../controllers/cartController");
const router = express.Router();

/*RUTA HACIA LA VISTA DEL CARRITO*/
router.get('/cart',cartController.cartView ); 


module.exports = router;