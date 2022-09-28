const express = require('express');
const cartController = require("../controllers/cartController");
const router = express.Router();

/*RUTA HACIA LA VISTA DEL CARRITO*/
router.get('/',cartController.cartVista ); 


module.exports = router;