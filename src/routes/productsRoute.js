//Require
const express = require('express');
const multer = require('multer');
const router = express.Router();

//Controller
const productsController = require("../controllers/productsController");


//Multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  }) 
  var upload = multer({ storage: storage })

//Vistas

//todos los productos
router.get('/', productsController.index);

//un producto 
router.get('/detail/:id/', productsController.detail); 

//crear producto
router.get('/create', productsController.create); 
router.post('/',upload.single('product-img'), productsController.store); 

//editar producto
router.get('/edit/:id/', productsController.edit);
router.put('/edit/:id',upload.single('product-img'), productsController.update); 

//eliminar Producto
router.delete('/delete/:id/', productsController.destroy);
router.delete('/delete/img/:id', productsController.destroyImg); 

//export
module.exports = router;