const express = require('express');
const router = express.Router();

/* Controlador*/
const userControllerSql = require('../controllers/UserControllerSql');

/* Middlewares */
const uploadFile = require('../middlewares/userMulterMiddleware');
const validations = require("../middlewares/usersRegValidatorMiddleware");
const validationsEdit = require("../middlewares/usersEditValidatorMiddleware");
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/* Crear Usuario */
router.get('/register', guestMiddleware, userControllerSql.vistaRegister); 
router.post('/register', uploadFile.single('imagenUsuario'), validations, userControllerSql.registro);
/* Lista Usuarios*/
router.get('/list', userControllerSql.vistaLista);
router.get('/detail/:id', userControllerSql.vistaDetalle);
/* Editar Usuario */
router.get('/profile', authMiddleware, userControllerSql.vistaProfile);
router.put('/profile/:id', uploadFile.single('imagenUsuario'), validationsEdit, userControllerSql.editar);
/* Eliminar Usuario */
router.delete('/delete/:idUser', userControllerSql.eliminar);

/* Login*/
router.get('/login', guestMiddleware, userControllerSql.vistaLogin);
router.post('/login', userControllerSql.login);
router.get('/logout', userControllerSql.logout);

module.exports = router;