//Require
const express = require('express');
const multer = require('multer');
const router = express.Router();
//Multer
const upload = require("../middlewares/productsMulterMiddleware")
//Validaciones
const validations = require("../middlewares/productsValidatorMiddleware");
//Controller
const productsController = require("../controllers/productsController");



//Vistas

//todos los productos
router.get('/', productsController.list);

//un producto 
router.get('/detail/:id/', productsController.detail); 

// //crear producto
router.get('/create', productsController.create); 
router.post('/create',upload.single("product-img"), validations, productsController.store); 

// //editar producto
 router.get('/edit/:id/', productsController.edit);
 router.put('/edit/:id',upload.single('product-img'), productsController.update); 

// //eliminar Producto
router.get('/delete/:id', productsController.delete);
// router.delete('/delete/:id/', productsController.destroy);
// router.delete('/delete/img/:id', productsController.destroyImg); 

//export
module.exports = router;