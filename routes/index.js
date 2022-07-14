var express = require('express');
// const mainController = require("../controllers/main");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'home' });
});
router.get('/productos', function(req, res, next) {
    res.render('productos', { title: 'producto' });
});
router.get('/detalle-productos', function(req, res, next) {
    res.render('detalle-productos', { title: 'DetalleDeProducto' });
});
router.get('/register', function(req, res, next) {
    res.render('register',{ title: 'registro', estilo: '<link href="css/resgister-style.css" rel="stylesheet">'});
});
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'login' });
});



// router.get('/', mainController.home); 
// router.get('/productos', mainController.productos); 
// router.get('/detalle-productos', mainController.detalleProductos); 
// router.get('/login', mainController.login); 
// router.get('/register', mainController.register); 


module.exports = router;

