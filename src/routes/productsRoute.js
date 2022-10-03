//Require
const express = require('express');
const router = express.Router();
//Multer
const upload = require("../middlewares/productsMulterMiddleware")
//Validaciones
const validations = require("../middlewares/productsValidatorMiddleware");
//Controller
const productsController = require("../controllers/productsController");
const cartController = require("../controllers/cartController");


//----------------Vistas-------------------------

//todos los productos
router.get('/', productsController.list);

//un producto 
router.get('/detail/:id/', productsController.detail); 

//carrito
router.get('/cart', cartController.cartVista); 

//----------------Search Bar-------------------------
router.get("/search/:id", productsController.search)

//---------------- Filtros -------------------------
router.post("/filter/", productsController.filter)

//---------------- Category menu -------------------------
// router.post("/category/", productsController.menuCategory)



//------------------CRUD------------------------

// //crear producto
router.get('/create', productsController.create); 
router.post('/create',upload.single("image"), productsController.store); 

// //editar producto
 router.get('/edit/:id/', productsController.edit);
 router.put('/edit/:id',upload.single('image'), productsController.update); 

// //eliminar Producto
router.get('/delete/:id', productsController.delete);
 router.delete('/delete/:id/', productsController.destroy);
 //router.delete('/delete/img/:id', productsController.destroyImg); 


 //-----------------Carrito----------------------

//agregar
//router.post('/cart/add', cartController.add); 

//borrar un prodcuto
// router.delete('/cart/delete/:id/', cartController.destroy);

//vaciar carrito
// router.delete('/cart/deleteAll/:id/', cartController.destroyAll);

//comprar
//pendiente

//export
module.exports = router;
