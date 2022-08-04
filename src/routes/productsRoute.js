//Require
const express = require('express');
const multer = require('multer');
const router = express.Router();

//Controller
const productsController = require("../controllers/productsController");
const cartController = require ('../controllers/cartController');

//Multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/productos')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  }) 
  var upload = multer({ storage: storage })

//Vistas

//todos los prodcutos
router.get('/', productsController.index);

//un producto 
router.get('/detail', productsController.detail); 

//Carrito
router.get('/cart',cartController.cartView ); 

//crear producto
router.get('/product-create', productsController.create); 
router.post('/', productsController.store); 


module.exports = router;