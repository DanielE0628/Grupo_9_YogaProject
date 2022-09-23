const express = require('express');
const router = express.Router();

/* Controlador*/
const userController = require('../controllers/userController');

/* Middlewares */
const uploadFile = require('../middlewares/userMulterMiddleware');
const validations = require("../middlewares/usersRegValidatorMiddleware");

/* Vistas Usuario */ 
router.get('/', userController.vistaUser);
router.get('/login', userController.vistaLogin); 
router.get('/instructors', userController.vistaInstructors);
router.get('/list', userController.vistaLista);
router.get('/detail/:id',userController.vistaDetail);

/* Buscar Usuario */
router.get('/search',userController.search);

/* Editar Usuario */
router.get('/edit/:idUser',userController.edit);
router.put('/edit/:idUser', function(req, res){
    res.send("fui por PUT");
});

/* Eliminar Usuario */
router.delete('/delete/:idUser',function(req, res){
    res.send("fui por DELETE");
});

/* Crear Usuario */
router.get('/register', userController.vistaRegister); 
router.post('/register', uploadFile.single('imagenUsuario'), validations, userController.registro);

module.exports = router;