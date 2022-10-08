const express = require('express');
const router = express.Router();

/* Controlador*/
const userController = require('../controllers/userController');

/* Middlewares */
const uploadFile = require('../middlewares/userMulterMiddleware');
const validations = require("../middlewares/usersRegValidatorMiddleware");
const validationsEdit = require("../middlewares/usersEditValidatorMiddleware");
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

/* Vistas Usuario */
router.get('/', userController.vistaUser);
router.get('/instructors', userController.vistaInstructors);

/* Login*/
router.get('/list', userController.vistaLista);
router.get('/detail/:id', userController.vistaDetalle)



/* Login*/
router.get('/login', guestMiddleware, userController.vistaLogin);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

/* Buscar Usuario */
router.get('/search', userController.search);

/* Editar Usuario */
router.get('/profile/:id', authMiddleware, userController.vistaProfile);
router.put('/profile/:id', uploadFile.single('imagenUsuario'), validationsEdit, userController.edit);

/* Eliminar Usuario */
router.delete('/delete/:idUser', function (req, res) {
    res.send("fui por DELETE");
});

/* Crear Usuario */
router.get('/register', guestMiddleware, userController.vistaRegister);
router.post('/register', uploadFile.single('imagenUsuario'), validations, userController.registro);

module.exports = router;