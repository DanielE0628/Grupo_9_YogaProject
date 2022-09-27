const express = require('express');
const cartController = require("../controllers/cartController");
const router = express.Router();

/*RUTA HACIA LA VISTA DEL CARRITO*/
router.get('/',cartController.cartView ); 


module.exports = router;