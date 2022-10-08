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
// router.get('/cart', cartController.cartVista); 

//----------------Search Bar-------------------------
router.get("/search/", productsController.search)

//---------------- Filtros -------------------------
router.post("/filter/", productsController.filter)

//---------------- Category menu -------------------------
// router.post("/category/", productsController.menuCategory)


//----------------------------------------------
//------------------CRUD------------------------
//----------------------------------------------

//------------------productos------------------------

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

//------------------categorias------------------------

// // crear/editar categoria

router.get('/categorys', productsController.listCategory); 
router.post('/category/create', productsController.storeCategory); 
router.put('/category/edit/:id', productsController.updateCategory); 
//router.delete('/category/delete/:id/', productsController.destroyCategory);
  
//------------------marcas------------------------

// //crear marca
//router.get('/marca/create', productsController.createMarca); 
//router.post('/marca/create', productsController.storeMarca); 

// //editar marca
 //router.get('/marca/edit/:id/', productsController.editMarca);
 //router.put('/marca/edit/:id', productsController.updateMarca); 

// //eliminar marca
//router.get('/marca/delete/:id', productsController.deleteMarca);
// router.delete('/marca/delete/:id/', productsController.destroyMarca);

//----------------------------------------------
//------------------CRUD FIN------------------------
//----------------------------------------------

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
