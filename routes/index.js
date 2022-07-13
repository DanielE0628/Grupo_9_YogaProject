var express = require('express');
const mainController = require("../controllers/main");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'Express' });
});
router.get('/productos', function(req, res, next) {
    res.render('productos', { title: 'Express' });
});
router.get('/detalle-productos', function(req, res, next) {
    res.render('detalle-productos', { title: 'Express' });
});
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});



// router.get('/', mainController.home); 
// router.get('/productos', mainController.productos); 
// router.get('/detalle-productos', mainController.detalleProductos); 
// router.get('/login', mainController.login); 
// router.get('/register', mainController.register); 


module.exports = router;

