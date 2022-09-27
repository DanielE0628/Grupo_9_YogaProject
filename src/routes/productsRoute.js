//Require
const express = require('express');
const multer = require('multer');
const router = express.Router();

//Controller
const productsController = require("../controllers/productsController");


// ************  MULTER ************

// {
//   fieldname: 'product-img',
//   originalname: 'motorola.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg'
// }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
}) 

function fileFilter (req, file, cb) {

  const validFormat = [ 'image/jpeg', 'image/jpg' ]

  // La función debe llamar a `cb` usando una variable del tipo boolean
  // para indicar si el archivo debería ser aceptado o no

  if(validFormat.includes(file.mimetype) ){
    // Para aceptar el archivo es necesario pasar `true`, de la siguiente forma:
    cb(null, true)
  }else{
    // Para rechazar el archivo es necesario pasar `false`, de la siguiente forma:
    cb(null, false)
  }
}
var upload = multer({ storage: storage, fileFilter: fileFilter })


//Vistas

//todos los productos
router.get('/', productsController.list);

//un producto 
router.get('/detail/:id/', productsController.detail); 

// //crear producto
router.get('/create', productsController.create); 
router.post('/',upload.single('product-img'), productsController.store); 

// //editar producto
// router.get('/edit/:id/', productsController.edit);
// router.put('/edit/:id',upload.single('product-img'), productsController.update); 

// //eliminar Producto
// router.delete('/delete/:id/', productsController.destroy);
// router.delete('/delete/img/:id', productsController.destroyImg); 

//export
module.exports = router;